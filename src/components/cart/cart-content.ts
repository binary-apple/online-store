import { Component } from '../types/component';
import { Cart } from '../../model/cart/cart';
import CartProducts from './cart-products';
import SelectAllProducts from './select-all-products';
import CartTotal from './cart-total';
import CartLocalStorage from '../../model/cart/cart-local-storage';

const cartLocalStorage = new CartLocalStorage();

class CartContent extends Component {
    cart: Cart;
    cartProducts: CartProducts;
    selectAllProducts: SelectAllProducts;
    cartTotal: CartTotal;

    constructor(cart: Cart) {
        super({ containerTag: 'section', className: ['row', 'cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.selectAllProducts = new SelectAllProducts(this.cart);
        this.cartTotal = new CartTotal(this.cart);

        this.subscribe(this.cart);

        if (!cartLocalStorage.get()?.products?.length) {
            this.cart.addProductToCart(1, 1);
            this.cart.addProductToCart(2, 1);
            this.cart.addProductToCart(3, 1);
            this.cart.addProductToCart(4, 1);
            this.cart.addProductToCart(5, 1);
        }
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.templateCart();

        return main.content;
    }

    templateCart() {
        return `
            <div class="row d-flex cart-content__title">
                <h1 class="col-3 cart-title__text">Корзина</h1>
                ${this.cartCounter()}
            </div>
            <div class="row col-9 cart-content__remove-selected d-flex justify-content-between">
                ${this.selectAllProducts.toString()}
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
        const cartNoEmpty = this.cart.getTotalCount() !== 0;

        return cartNoEmpty ? `<span class="col-1 cart-title__cart-counter">${this.cart.getTotalCount()}</span>` : '';
    }

    update() {
        const products = this.cart.getProducts();

        const counter = document.querySelector('.cart-title__cart-counter');

        if (counter) {
            counter.remove();
            const title = document.querySelector('.cart-content__title');

            if (title) {
                title.insertAdjacentHTML('beforeend', this.cartCounter());
            }
        }

        const cart = document.querySelector('.cart-content__remove-selected');
        const content = document.querySelector('.cart-content__products');

        if (cart && content && products.length) {
            cart.classList.remove('hide');
            content.classList.remove('hide');
        } else if (cart && content && !products.length) {
            cart.classList.add('hide');
            content.classList.add('hide');

            const wrapper = document.querySelector('.cart-content');

            wrapper?.insertAdjacentHTML('beforeend', '<div class="cart-content__placeholder">Cart is Empty</div>');
        }
    }
}

export default CartContent;
