import { Component } from "../types/component";
import { Products } from "./products";
import { Products as ProductsModel } from "../../model/products/products";
import { Slider } from "./slider";

export class MainProducts extends Component
{
    private readonly priceSlider;
    private readonly products;
    constructor(big: boolean, productsModel: ProductsModel) {
        super({containerTag: 'main', className: 'main container'.split(' ')});
        this.priceSlider = new Slider();
        this.products = new Products(big, productsModel);
    }

    protected template(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(...'position-relative d-flex flex-wrap mb-3'.split(' '));
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

    handleBigScaleClick(callback: (e: Event) => void) {
        this.products.handleBigScaleClick(callback);
    }

    handleSmallScaleClick(callback: (e: Event) => void) {
        this.products.handleSmallScaleClick(callback);
    }

    setBigScale() {
        this.products.setBigScale();
    }

    setSmallScale() {
        this.products.setSmallScale();
    }
}