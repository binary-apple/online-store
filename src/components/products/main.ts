import { Component } from "../types/component";
import { Products } from "./products";
import { Slider } from "./slider";

export class MainProducts extends Component
{
    private readonly priceSlider;
    private readonly products;
    constructor() {
        super({containerTag: 'main', className: 'main container'.split(' ')});
        this.priceSlider = new Slider();
        this.products = new Products();
    }

    protected template(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(...'position-relative d-flex gap-3'.split(' '));
        wrapper.append(this.priceSlider.render());
        wrapper.append(this.products.render());
        return wrapper;
    }

    handleSliderInput(callback: (e: Event) => void) {
        this.priceSlider.handleSliderInput(callback);
    }

    setSliderTrack() {
        this.priceSlider.setSliderTrack();
    }

    handleViewIconClick(callback: (e: Event) => void) {
        this.products.handleViewIconClick(callback);
    }

    toggeView(e: Event) {
        this.products.toggleView(e);
    }
}