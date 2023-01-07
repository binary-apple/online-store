import { Component } from "../types/component";
import { Products } from "./products";
import { Products as ProductsModel } from "../../model/products/products";
import { Cart } from "../../model/cart";
import CartLocalStorage from "../../model/cart-local-storage";
import { AllFilters } from "./all-filters";

export class MainProducts extends Component
{
    private readonly filters;
    private readonly products;
    constructor(big: boolean, productsModel: ProductsModel, cart: Cart, cartLS: CartLocalStorage) {
        super({containerTag: 'main', className: 'main container'.split(' ')});
        this.filters = new AllFilters(productsModel);
        this.products = new Products(big, productsModel, cart, cartLS);
    }

    protected template(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(...'position-relative d-flex flex-wrap my-3'.split(' '));
        wrapper.append(this.filters.render());
        wrapper.append(this.products.render());
        return wrapper;
    }

    // public handleSliderInput(callback: (e: Event) => void) {
    //     this.priceSlider.handleSliderInput(callback);
    // }

    // public setSliderTrack() {
    //     this.priceSlider.setSliderTrack();
    // }

    public handleScaleClick(callback: (big: boolean) => void) {
        this.products.handleScaleClick(callback);
    }

    public handleProductClick(callback: (id: number) => void) {
        this.products.handleProductClick(callback);
    }

    public handleCopyLinkClick(callback: () => void) {
        const copyLink = this.container.querySelector('.copy-link');
        if (!copyLink || !(copyLink instanceof HTMLElement)) throw new Error('No copy-link button');
        copyLink.addEventListener('click', (e: Event) => {
            callback();
            copyLink.innerHTML = 'Copied!';
            setTimeout(() => { copyLink.innerHTML = 'Copy link'; }, 600);
        })
    }

}