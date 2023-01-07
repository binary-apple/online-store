import { Component } from '../types/component';
import CartProducts from './cart-products';
import CartTotalBoard from './cart-total-board';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import CartNavigation from './cart-navigation';

const counterTemplate = require('./component/counter.html');
const contentTemplate = require('./component/content.html');

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
        const contentIsHide = this.cart.getTotalCount() === 0 ? 'hide' : '';

        return contentTemplate({ counter, contentIsHide, products, total, navigation });
    }

    private cartCounter() {
        const counter = this.cart.getTotalCount();
        const cartNoEmpty = counter !== 0;

        return cartNoEmpty ? counterTemplate({ counter }) : '';
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
