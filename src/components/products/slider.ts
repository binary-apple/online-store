import { Publisher, Subscriber } from "../../utils/observer-interface";
import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";
import { Filter as FilterModel } from "../../model/products/filter";

export class Slider extends Component implements Subscriber {
    private readonly products: ProductsModel;
    private readonly filterModel: FilterModel;
    private readonly sliderName: 'price' | 'stock';
    constructor(products: ProductsModel, filterModel: FilterModel, sliderName: 'price' | 'stock') {
        super({containerTag: 'div', className: ['slider', `slider-${sliderName}`, 'pb-3']});
        this.products = products;
        this.filterModel = filterModel;
        this.sliderName = sliderName;
        this.subscribe(this.products, this.filterModel);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        const {min, max} = this.products.getTotalRange(this.sliderName);
        temp.innerHTML = `
        <div class="slider-title d-flex justify-content-center lh-base">${this.sliderName.replace(new RegExp(/(^\w{1})/), this.sliderName[0].toUpperCase())}</div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <div class="min-${this.sliderName} ${this.sliderName}">${min}</div>
            <div class="max-${this.sliderName} ${this.sliderName}">${max}</div>
        </div>
        <input type="range" name="min-${this.sliderName}" min="${min}" max="${max}" value="${min}" step="any" class="slider" id="min-${this.sliderName}">
        <input type="range" name="max-${this.sliderName}" min="${min}" max="${max}" value="${max}" step="any" class="slider" id="max-${this.sliderName}">
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