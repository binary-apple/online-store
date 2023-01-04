import { Cart } from '../../model/cart/cart';
import { Component } from '../types/component';

class CartPagination extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super();

        this.cart = cart;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public toString() {
        return this.getTemplate();
    }

    public changeLimitPaginationHandler(callback: (e: Event) => void) {
        const limitInput = document.querySelector('.cart-pagination__value');

        if (limitInput) {
            limitInput.addEventListener('change', (e: Event) => {
                callback(e);
            });
            limitInput.addEventListener('keyup', (e: Event) => {
                callback(e);
            });
        }
    }

    public changePagePaginationClickHandler(callback: (e: Event, type: string) => void) {
        const increaseBtn = document.querySelector('.cart-pagination__forward');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', (e: Event) => {
                callback(e, 'increase');
            });
        }

        const decreaseBtn = document.querySelector('.cart-pagination__back');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', (e: Event) => {
                callback(e, 'decrease');
            });
        }
    }

    public getTemplate() {
        const cart = this.cart.get();

        return `
            <div class="d-inline-flex cart-content__pagination">
                <div class="d-flex align-items-center">
                    Limit: 
                    <input type="number" value="${cart.params.limit}" class="cart-pagination__value">
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

    public getPaginationTemplate() {
        const cart = this.cart.get();

        return `
            <span>
                <span class="cart-pagination__back"><</span>
                <span class="cart-pagination__page">${cart.params.page}</span>
                <span class="cart-pagination__forward">></span>
            </span>
        `;
    }

    private update() {
        const pagination = document.querySelector('.cart-pagination__page');

        const cart = this.cart.get();

        if (pagination) {
            pagination.innerHTML = '';
            pagination.innerHTML = '' + cart.params.page;
        }
    }
}

export default CartPagination;
