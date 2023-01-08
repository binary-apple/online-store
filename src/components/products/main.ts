import { Component } from "../types/component";
import { Products } from "./products";
import { Products as ProductsModel } from "../../model/products/products";
import { Slider } from "./slider";
import { Cart } from "../../model/cart";
import CartLocalStorage from "../../model/cart-local-storage";

export class MainProducts extends Component
{
    private readonly priceSlider;
    private readonly products;
    // private readonly cart;
    constructor(big: boolean, productsModel: ProductsModel, cart: Cart, cartLS: CartLocalStorage) {
        super({containerTag: 'main', className: 'main container'.split(' ')});
        this.priceSlider = new Slider();
        // this.cart = cart;
        // this.cartLS = 
        this.products = new Products(big, productsModel, cart, cartLS);
    }

    protected template(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(...'position-relative d-flex flex-wrap my-3'.split(' '));
        wrapper.append(this.priceSlider.render());
        wrapper.append(this.products.render());
        return wrapper;
    }

    public handleSliderInput(callback: (e: Event) => void) {
        this.priceSlider.handleSliderInput(callback);
    }

    public setSliderTrack() {
        this.priceSlider.setSliderTrack();
    }

    public handleScaleClick(callback: (big: boolean) => void) {
        this.products.handleScaleClick(callback);
    }

    public handleProductClick(callback: (id: number) => void) {
        this.products.handleProductClick(callback);
    }

}