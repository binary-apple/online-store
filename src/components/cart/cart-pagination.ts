import CartFacade from '../../model/cart/cart-facade';
import { Component } from '../types/component';

class CartPagination extends Component {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        super();

        this.cart = cart;

        this.subscribe(this.cart.paginationStore);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    toString() {
        return this.getTemplate();
    }

    getTemplate() {
        return `
            <div class="d-inline-flex cart-content__pagination">
                <div class="d-flex align-items-center">
                    Limit: 
                    <input type="number" value="${this.cart.pagination.limit}" class="cart-pagination__value">
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
                <span class="cart-pagination__page">${this.cart.pagination.page}</span>
                <span class="cart-pagination__forward">></span>
            </span>
        `;
    }

    update() {
        const pagination = document.querySelector('.cart-pagination__page');

        if (pagination) {
            pagination.innerHTML = '';
            pagination.innerHTML = '' + this.cart.pagination.page;
        }
    }
}

export default CartPagination;
