import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart/cart';

class CartProducts extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super({ containerTag: 'div', className: ['cart-products'] });

        this.cart = cart;

        this.subscribe(this.cart);

        const rendered = this.rendered.bind(this);

        window.addEventListener('render-component', rendered);
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

    public linkClickHandler(callback: (e: Event) => void) {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener('click', (e) => {
                callback(e);
            });
        }
    }

    public changeQuntityProductInCart(callback: (e: Event, type: string) => void) {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener('click', (e: Event) => {
                const htmlTarget = e.target as HTMLElement;

                const isIncrease = htmlTarget.classList.contains('cart-quanity__btn--plus');
                const isDecrease = htmlTarget.classList.contains('cart-quanity__btn--minus');

                if (isIncrease) {
                    callback(e, 'increase');
                } else if (isDecrease) {
                    callback(e, 'decrease');
                }
            });
        }
    }

    private getProductsTemplate() {
        const cart = this.cart.get();

        if (cart.products.length) {
            const productTemplate = this.getProductTemplate.bind(this);

            return cart.products.map(productTemplate).join('');
        }

        return '';
    }

    private getProductTemplate(item: Product) {
        const checkboxProduct = new Checkbox({
            id: `product-${item.id}`,
            value: item.id,
        });

        return `
            <li class="cart-item d-flex">
                ${checkboxProduct.toString()}
                <a class="cart-item__link d-flex w-100" data-href="/product/${item.id}" href="">
                    <div class=" cart-item__img">
                        <img class="cart-item__picture" src="${item.images[0]}" alt="product-img">
                    </div>
                    <ul class="cart-item__wrapper w-100">
                        <li class="d-flex w-100 justify-content-between">
                            <div class="d-flex justify-content-start w-100">
                                <div class="cart-item__order">
                                    № ${item.order}
                                </div>
                                <div class="cart-item__description">
                                    <h2 class="cart-item__title">${item.title}</h2>
                                    <p class="cart-item__description-text">${item.description}</p>
                                    <p class="cart-item__one-price">
                                        <span class="cart-item__one-price--value">${item.price} €</span>
                                        per item
                                        <span class="cart-item__stock">
                                            <span class="cart-item-stock__value">${item.stock}</span> 
                                            stock
                                        <span>
                                    </p>
                                </div>
                            </div>
                            <div class="cart-item__nav d-flex align-items-start">
                                <div data-exception="true" class="cart-item__quanity d-flex align-items-center justify-content-between">
                                    <button data-exception="true" class="cart-quanity__btn cart-quanity__btn--minus" type="button"></button>
                                    <span data-exception="true" class="cart-quanity__value">${item.count}</span>
                                    <button data-exception="true" class="cart-quanity__btn cart-quanity__btn--plus" type="button"></button>
                                </div>
                                <div class="cart-item__price">
                                    ${item.count * item.price} €
                                </div>
                            </div>
                        </li>
                    </ul>
                </a>
            </li>
        `;
    }

    private update() {
        const cart = this.cart.get();

        const products = cart.products;
        this.updateProductsList(products);
    }

    private rendered() {
        const cart = this.cart.get();

        const products = cart.products;
        this.updateProductsList(products);
    }

    private updateProductsList(products: Array<Product>) {
        const productsWrapper = document.querySelector('.cart-products');

        if (productsWrapper) {
            productsWrapper.innerHTML = '';

            if (!products.length) {
                productsWrapper.insertAdjacentHTML(
                    'afterbegin',
                    '<div class="cart-content__placeholder">Page is empty...</div>'
                );
            } else {
                productsWrapper.insertAdjacentHTML('afterbegin', this.toString());
            }
        }
    }
}

export default CartProducts;
