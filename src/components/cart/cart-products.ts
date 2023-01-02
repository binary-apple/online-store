import { Component } from '../types/component';
import { Cart } from '../../model/cart/cart';
import Checkbox from '../ui/checkbox';
import { CartItem } from '../../model/types/cart';

class CartProducts extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super();

        this.cart = cart;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getProducts();

        return main.content;
    }

    private getProducts() {
        return this.getProductsTemplate();
    }

    public toString() {
        return this.getProducts();
    }

    private getProductsTemplate() {
        const products = this.cart.getProducts();

        const productTemplate = this.getProductTemplate.bind(this);

        return products.map(productTemplate).join('');
    }

    getProductTemplate(item: CartItem, index: number) {
        const checkboxProduct = new Checkbox({
            id: `product-${item.productId}`,
            value: item.productId,
        });

        return `
            <li class="cart-item d-flex">
                ${checkboxProduct.toString()}
                <div class=" cart-item__img">
                    <img src="./" alt="product-img">
                </div>
                <ul class="cart-item__wrapper w-100">
                    <li class="d-flex w-100 justify-content-between">
                        <div class="d-flex justify-content-start w-100">
                            <div class="cart-item__order">
                                № ${item.order}
                            </div>
                            <div class="cart-item__description">
                                <h2 class="cart-item__title">Название товара</h2>
                                <p class="cart-item__description-text">Описание товара</p>
                                </p>
                                <p class="cart-item__one-price">
                                    <span class="cart-item__one-price--value">${item.productId} €</span>
                                    per item
                                </p>
                            </div>
                        </div>
                        <div class="cart-item__nav d-flex align-items-start">
                            <div class="cart-item__quanity d-flex align-items-center justify-content-between">
                                <button class="cart-quanity__btn cart-quanity__btn--minus" type="button"></button>
                                <span class="cart-quanity__value">${item.count}</span>
                                <button class="cart-quanity__btn cart-quanity__btn--plus" type="button"></button>
                            </div>
                            <div class="cart-item__price">
                                ${item.count * item.productId} €
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        `;
    }

    update() {
        const products = document.querySelector('.cart-products');

        if (products) {
            products.innerHTML = '';
            products.innerHTML = this.toString();
        }
    }
}

export default CartProducts;
