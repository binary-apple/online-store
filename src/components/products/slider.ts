import { Publisher, Subscriber } from "../../utils/observer-interface";
import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";

export class Slider extends Component implements Subscriber {
    private readonly products: ProductsModel;
    private readonly sliderName: string;
    constructor(products: ProductsModel, sliderName: string) {
        super({containerTag: 'div', className: ['slider', `slider-${sliderName}`, 'pb-3']});
        this.products = products;
        this.sliderName = sliderName.toLocaleLowerCase();
        this.subscribe(this.products);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="slider-title d-flex justify-content-center lh-base">${this.sliderName.replace(new RegExp(/(^\w{1})/), this.sliderName[0].toUpperCase())}</div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <div class="min-${this.sliderName} ${this.sliderName}">0</div>
            <div class="max-${this.sliderName} ${this.sliderName}">100</div>
        </div>
        <input type="range" name="min-${this.sliderName}" min="0" max="100" value="0" step="any" class="slider">
        <input type="range" name="max-${this.sliderName}" min="0" max="100" value="100" step="any" class="slider">
        <div class="slider-track"></div>
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

    update(): void {
        console.log('slider update');
    }
}