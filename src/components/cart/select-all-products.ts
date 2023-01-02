import { Cart } from '../../model/cart/cart';
import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';

class SelectAllProducts extends Component {
    cart: Cart;

    constructor(cart: Cart) {
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
            text: 'Выделить все',
            value: 'select-all',
        });

        return `
            <div class="cart-content__remove-wrapper d-flex justify-content-between">
                <div class="cart-content__select-all">
                    ${selectAll.toString()}
                </div>
                <div class="d-flex">
                    <button class="cart-remove-selected__btn" type="button">
                        Удалить выбранные
                    </button>
                </div>
            </div>
            <div class="d-inline-flex cart-content__pagination">
                <div class="d-flex align-items-center">
                    Limit: 
                    <input type="number" value="${this.cart.getPagination().limit}" class="cart-pagination__value">
                </div>
                <div class="cart-pagination__nav d-flex align-items-center">
                    Page:
                    <span class="cart-pagination__wrapper">
                        ${this.getPaginationTemplate()}
                    </span>
                </div>
            </div>
        `;
    }

    getPaginationTemplate() {
        return `
            <span>
                <span class="cart-pagination__back"><</span>
                <span class="cart-pagination__page">${this.cart.getPagination().page}</span>
                <span class="cart-pagination__forward">></span>
            </span>
        `;
    }

    toString() {
        return this.getSelectAllProducts();
    }

    update() {
        const pagination = document.querySelector('.cart-pagination__wrapper');

        if (pagination) {
            pagination.innerHTML = '';
            pagination.innerHTML = this.getPaginationTemplate();
        }
    }
}

export default SelectAllProducts;
