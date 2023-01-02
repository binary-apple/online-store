import Router from 'vanilla-router';
import { Cart } from '../../../model/cart/cart';
import CartQuery from '../../../model/cart/cart-query';

const cartQuery = new CartQuery();

class CartPagination {
    cart: Cart;
    router: Router;

    constructor(cart: Cart, router: Router) {
        this.cart = cart;
        this.router = router;
    }

    init() {
        this.changeLimit();
        this.changePage();
    }

    changeLimit() {
        const limitInput = document.querySelector('.cart-pagination__value');

        if (limitInput) {
            limitInput.addEventListener('change', (e) => {
                if (+(e.target as HTMLInputElement).value < 1) {
                    (e.target as HTMLInputElement).value = '1';
                }

                const value = +(e.target as HTMLInputElement).value;

                const pagination = {
                    limit: value,
                };

                this.cart.setPagination(pagination);
            });
        }
    }

    changePage() {
        const nav = document.querySelector('.cart-pagination__nav');

        if (nav) {
            nav.addEventListener('click', (e) => {
                const htmlTarget = e.target as HTMLElement;

                const isPageUp = htmlTarget.classList.contains('cart-pagination__forward');

                if (isPageUp) {
                    const pagination = this.cart.getPagination();
                    pagination.page += 1;

                    this.cart.setPagination(pagination);
                }

                const isPageDown = htmlTarget.classList.contains('cart-pagination__back');

                if (isPageDown) {
                    const pagination = this.cart.getPagination();

                    pagination.page -= 1;

                    this.cart.setPagination(pagination);
                }
            });
        }
    }
}

export default CartPagination;
