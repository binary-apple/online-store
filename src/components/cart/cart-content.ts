import { Component } from '../types/component';
import CartProducts from './cart-products';
import SelectAllProducts from './select-all-products';
import CartTotal from './cart-total';
import CartFacade from '../../model/cart/cart-facade';
import CartPagination from './cart-pagination';
import { Product } from '../../model/types/product';

class CartContent extends Component {
    cart: CartFacade;
    cartProducts: CartProducts;
    selectAllProducts: SelectAllProducts;
    cartTotal: CartTotal;
    cartPagination: CartPagination;
    products: Array<Product> = [];

    constructor(cart: CartFacade) {
        super({ containerTag: 'section', className: ['row', 'cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.selectAllProducts = new SelectAllProducts(this.cart);
        this.cartTotal = new CartTotal(this.cart);
        this.cartPagination = new CartPagination(this.cart);

        this.subscribe(this.cart.paginationStore);
        this.subscribe(this.cart.cartStore);
        this.subscribe(this.cart.cartLS);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.templateCart();

        return main.content;
    }

    templateCart() {
        return `
            <div class="row d-flex cart-content__title">
                <h1 class="col-2 cart-title__text">Cart</h1>
                ${this.cartCounter()}
            </div>
            <div class="row col-9 cart-content__remove-selected d-flex justify-content-between">
                ${this.selectAllProducts.toString()}
                ${this.cartPagination.toString()}
            </div>
            <div class="row cart-content__products">
                <ul class="col-9 cart-products">
                    ${this.cartProducts.toString()}
                </ul>
                <div class="col-3 cart-total">
                    ${this.cartTotal.toString()}
                </div>
            </div>
        `;
    }

    cartCounter() {
        const cartNoEmpty = this.cart.quantityProducts !== 0;

        return cartNoEmpty ? `<span class="col-1 cart-title__cart-counter">${this.cart.quantityProducts}</span>` : '';
    }

    update() {
        const counter = document.querySelector('.cart-title__cart-counter');

        if (counter) {
            counter.remove();
            const title = document.querySelector('.cart-content__title');

            if (title) {
                title.insertAdjacentHTML('beforeend', this.cartCounter());
            }
        }
    }
}

export default CartContent;
