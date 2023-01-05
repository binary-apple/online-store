import { Component } from '../components/types/component';
import { Product } from './types/product';

class CartLocalStorage extends Component {
    name: string;
    initialCart;

    constructor(name: string) {
        super();
        this.name = name;

        this.initialCart = {
            params: {
                limit: 3,
                page: 1,
            },
            products: [],
        };

        const cart = this.get();

        if (!cart) {
            const jsonCart = JSON.stringify(this.initialCart);
            localStorage.setItem(this.name, jsonCart);
        }
    }

    protected template(): HTMLElement | DocumentFragment {
        const main = document.createElement('template');

        return main.content;
    }

    set(cart: Array<Product>) {
        localStorage.removeItem(this.name);

        const jsonCart = JSON.stringify(cart);

        localStorage.setItem(this.name, jsonCart);
    }

    get() {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const cart = JSON.parse(jsonCart);

            return cart;
        }
    }
}

export default CartLocalStorage;
