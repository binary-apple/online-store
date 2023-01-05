import { Component } from "../components/types/component";
import { Publisher, Subscriber } from "../utils/observer-interface";
import { Cart } from "./cart";

export class CartAPI implements Subscriber {
    toJSON(cart: Cart) {
        return JSON.stringify(cart.getCart());
    }

    createFromJSON() {
        const s = localStorage.getItem('cart-apple-nepo');
        if (s) return JSON.parse(s);
    }

    update(cart: Cart): void {
        localStorage.setItem('cart-apple-nepo', this.toJSON(cart));
    }
}