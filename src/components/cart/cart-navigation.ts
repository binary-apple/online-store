import { Cart } from '../../model/cart';
import { Component } from '../types/component';
const Navigation = require('./component/navigation.html');
import Checkbox from '../ui/checkbox';

class CartNavigation extends Component {
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

    public changeLimitPaginationHandler(callback: (target: HTMLInputElement) => void) {
        const limitInput = document.querySelector('.cart-pagination__value');

        if (limitInput) {
            limitInput.addEventListener('change', (e) => {
                const inputTarget = e.target as HTMLInputElement;

                if (inputTarget.value === '') {
                    return;
                }

                callback(inputTarget);
            });

            limitInput.addEventListener('keyup', (e: Event) => {
                const inputTarget = e.target as HTMLInputElement;

                if (inputTarget.value === '') {
                    return;
                }

                callback(inputTarget);
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
        const pagination = this.cart.getPagination();

        const selectAll = new Checkbox({
            id: 'select-all',
            text: 'Select all',
            value: 'select-all',
        }).getTemplate();

        return Navigation({ limit: pagination.limit, page: pagination.page, selectAll });
    }

    public update() {
        const { limit, page } = this.cart.getPagination();

        const pagination = document.querySelector('.cart-pagination__page');

        if (pagination) {
            pagination.innerHTML = '';
            pagination.innerHTML = '' + page;
        }

        const limitInput = document.querySelector('.cart-pagination__value') as HTMLInputElement;

        if (limitInput) {
            limitInput.value = '' + limit;
        }
    }

    public selectAllChangeHandler() {
        const checkbox = document.getElementById('select-all');

        if (checkbox) {
            const productsWrapper = document.querySelector('.cart-products') as HTMLElement;

            checkbox.addEventListener('change', (e: Event) => {
                const inputTarget = e.target as HTMLInputElement;

                if (productsWrapper) {
                    const productCbs = Array.from(
                        productsWrapper.querySelectorAll('input[type="checkbox"]')
                    ) as Array<HTMLInputElement>;

                    if (inputTarget.checked) {
                        productCbs.forEach((item) => (item.checked = true));
                    } else {
                        productCbs.forEach((item) => (item.checked = false));
                    }
                }
            });
        }
    }

    public removeSelectedClickHandler(callback: (checkboxs: Array<HTMLInputElement>) => void) {
        const removeSelectedBtn = document.querySelector('.cart-remove-selected__btn');

        if (removeSelectedBtn) {
            const productsWrapper = document.querySelector('.cart-products') as HTMLElement;

            removeSelectedBtn.addEventListener('click', () => {
                const productCbs = Array.from(
                    productsWrapper.querySelectorAll('input[type="checkbox"]')
                ) as Array<HTMLInputElement>;

                callback(productCbs);

                const selectAllCb = document.getElementById('select-all') as HTMLInputElement;

                if (selectAllCb) {
                    selectAllCb.checked = false;
                }
            });
        }
    }
}

export default CartNavigation;
