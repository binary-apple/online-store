import { Subscriber } from "../../utils/observer-interface";
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
        <input type="range" name="min-${this.sliderName}" min="${min}" max="${max}" value="${min}" step="1" class="slider" id="min-${this.sliderName}">
        <input type="range" name="max-${this.sliderName}" min="${min}" max="${max}" value="${max}" step="1" class="slider" id="max-${this.sliderName}">
        <div class="slider-track"></div>
        `;
        return temp.content;
    }

    private setSliderTrack() {
        const minInput = this.container.querySelector(`#min-${this.sliderName}`);
        const maxInput = this.container.querySelector(`#max-${this.sliderName}`);
        const track = this.container.querySelector('.slider-track');
        if (!(track instanceof HTMLElement && minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement))
        throw new Error('No slider');

        const trackLen = minInput.getBoundingClientRect().width;
        const trackValue = Number(maxInput.value) - Number(minInput.value);
        const trackMinValue = Number(minInput.value);
        const trackRangeValue = Number(minInput.max) - Number(maxInput.min);
        track.style.left = `${(trackMinValue - Number(minInput.min)) / trackRangeValue * trackLen}px`;
        track.style.width = `${(trackValue / trackRangeValue) * trackLen}px`;
    }

    public handleResizeWindow() {
        window.addEventListener('resize', this.setSliderTrack.bind(this));
    }

    public handleSlidersInput(callback: (sliderName: 'price' | 'stock', minValue: number, maxValue: number)=>void) {
        const minInput = this.container.querySelector(`#min-${this.sliderName}`);
        const maxInput = this.container.querySelector(`#max-${this.sliderName}`);
        if (!(minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement))
        throw new Error('No inputs for sliders');

        if (minInput instanceof HTMLInputElement) {
            minInput.addEventListener('input', () => {
                const minValueEl = this.container.querySelector(`.min-${this.sliderName}`);
                if (minValueEl) {
                    minValueEl.innerHTML = `${+minInput.value}`;
                    this.setSliderTrack();
                }
                if (+minInput.value >=  +maxInput.value) minInput.value = `${+maxInput.value}`;
                callback(this.sliderName, +minInput.value, +maxInput.value);
            });
        }
        if (maxInput instanceof HTMLInputElement) {
            maxInput.addEventListener('input', () => {
                const maxValueEl = this.container.querySelector(`.max-${this.sliderName}`);
                if (maxValueEl) {
                    maxValueEl.innerHTML = `${+maxInput.value}`;
                    this.setSliderTrack();
                }
                if (+maxInput.value <=  +minInput.value) maxInput.value = `${+minInput.value}`;
                callback(this.sliderName, +minInput.value, +maxInput.value);
            });
        }
    }

    private setSlider() {
        const minInput = this.container.querySelector(`#min-${this.sliderName}`);
        const maxInput = this.container.querySelector(`#max-${this.sliderName}`);
        if (!(minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement))
        throw new Error('No inputs for sliders');
        
        const minValueEl = this.container.querySelector(`.min-${this.sliderName}`);
        const maxValueEl = this.container.querySelector(`.max-${this.sliderName}`);
        if (!(minValueEl instanceof HTMLElement && maxValueEl instanceof HTMLElement))
        throw new Error('No sliders values');

        if (this.filterModel.get()[this.sliderName].from && this.filterModel.get()[this.sliderName].to) {
            minInput.value = `${this.filterModel.get()[this.sliderName].from}`;
            maxInput.value = `${this.filterModel.get()[this.sliderName].to}`;
            minValueEl.innerHTML = `${+minInput.value}`;
            maxValueEl.innerHTML = `${+maxInput.value}`;
            this.setSliderTrack();
        }
    }

    update(): void {
        this.setSlider();
    }
}