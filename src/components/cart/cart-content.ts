import { Component } from '../types/component';
import CartProducts from './cart-products';
import CartTotalBoard from './cart-total-board';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import Mustache from 'mustache';
import Content from './component/content.html';
import Counter from './component/counter.html';
import CartNavigation from './cart-navigation';

class CartContent extends Component {
    cart: Cart;
    cartProducts: CartProducts;
    cartTotal: CartTotalBoard;
    products: Array<Product> = [];
    cartNavigation: CartNavigation;

    constructor(cart: Cart) {
        super({ containerTag: 'section', className: ['row', 'cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.cartTotal = new CartTotalBoard(this.cart);
        this.cartNavigation = new CartNavigation(this.cart);

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        const counter = this.cartCounter();
        const products = this.cartProducts.getTemplate();
        const total = this.cartTotal.getTemplate();
        const navigation = this.cartNavigation.getTemplate();

        return Mustache.render(Content, { counter, navigation, products, total });
    }

    private cartCounter() {
        const counter = this.cart.getTotalCount();
        const cartNoEmpty = counter !== 0;

        return cartNoEmpty ? Mustache.render(Counter, { counter }) : '';
    }

    public update() {
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
