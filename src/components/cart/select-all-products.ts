import { Cart } from '../../model/cart/cart';
import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';

class SelectAllProducts extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super();

        this.cart = cart;
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getSelectAllProducts();

        return main.content;
    }

    public selectAllChangeHandler(callback: (e: Event, container: HTMLElement) => void) {
        const checkbox = document.getElementById('select-all');

        if (checkbox) {
            const productsWrapper = document.querySelector('.cart-products') as HTMLElement;

            checkbox.addEventListener('change', (e: Event) => {
                callback(e, productsWrapper);
            });
        }
    }

    public removeSelectedClickHandler(callback: (container: HTMLElement) => void) {
        const removeSelectedBtn = document.querySelector('.cart-remove-selected__btn');

        if (removeSelectedBtn) {
            const productsWrapper = document.querySelector('.cart-products') as HTMLElement;

            removeSelectedBtn.addEventListener('click', (e: Event) => {
                callback(productsWrapper);
            });
        }
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

    public toString() {
        return this.getSelectAllProducts();
    }
}

export default SelectAllProducts;
