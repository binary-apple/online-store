import { Component } from "../types/component";

export class Slider extends Component {
    constructor() {
        super({containerTag: 'div', className: 'slider'.split(' ')});
        // this.handleSliderInput(this.setSliderTrack.bind(this));
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <form oninput="min.value=Math.min(first.value, second.value);max.value=Math.max(second.value, first.value)" class="input-form pb-4">
            <div class="d-flex justify-content-center lh-base">Price</div>
            <div class="d-flex justify-content-between w-100 mb-3">
                <output for="first" name="min" class="price px-3 lh-sm">0</output>
                <output for="second" name="max" class="price px-3 lh-sm">100</output>
            </div>
            <input type="range" name="first" min="0" max="100" value="0" class="slider">
            <input type="range" name="second" min="0" max="100" value="100" class="slider">
            <div class="slider-track"></div>
        </form>
        `;
        return temp.content;
    }

    public setSliderTrack() {
        const sliders = this.container.getElementsByClassName('slider');
        const track = this.container.querySelector('.slider-track');
        if (track instanceof HTMLElement && sliders[0] instanceof HTMLInputElement && sliders[1] instanceof HTMLInputElement) {
            const trackLen = sliders[0].getBoundingClientRect().width;
            const trackValue = Math.abs(Number(sliders[0].value) - Number(sliders[1].value));
            const trackMinValue = Math.min(Number(sliders[0].value), Number(sliders[1].value));
            const trackFullValue = Number(sliders[0].max) - Number(sliders[1].min);
            track.style.left = `${trackMinValue / trackFullValue * trackLen}px`;
            track.style.width = `${(trackValue / trackFullValue) * trackLen}px`;
        }
    }

    public handleSliderInput(callback: (e: Event)=>void) {
        const sliders = this.container.querySelectorAll('.slider');
        if (sliders) {
            sliders.forEach(element => {
                element.addEventListener('input', callback);
            });
        }
    }
}