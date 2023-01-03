import CartFacade from '../../model/cart/cart-facade';
import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';

class SelectAllProducts extends Component {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        super();

        this.cart = cart;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getSelectAllProducts();

        return main.content;
    }

    private getSelectAllProducts() {
        const selectAll = new Checkbox({
            id: 'select-all',
            text: 'Select all',
            value: 'select-all',
        });

        return `
            <div class="cart-content__remove-wrapper d-flex justify-content-between">
                <div class="cart-content__select-all">
                    ${selectAll.toString()}
                </div>
                <div class="d-flex">
                    <button class="cart-remove-selected__btn" type="button">
                        Remove selected
                    </button>
                </div>
            </div>
        `;
    }

    toString() {
        return this.getSelectAllProducts();
    }
}

export default SelectAllProducts;
