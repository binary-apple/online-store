import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';
import CartFacade from '../../model/cart/cart-facade';
import { Product } from '../../model/types/product';

class CartProducts extends Component {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        super({ containerTag: 'div', className: ['cart-products'] });

        this.cart = cart;

        this.subscribe(this.cart.cartLS);
        this.subscribe(this.cart.paginationStore);

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

    private getProductsTemplate() {
        const products = this.cart.paginationStore.getProducts(this.cart.cartLS.cart?.products);

        if (products.length) {
            const productTemplate = this.getProductTemplate.bind(this);

            return products.map(productTemplate).join('');
        }

        return '';
    }

    getProductTemplate(item: Product) {
        const checkboxProduct = new Checkbox({
            id: `product-${item.id}`,
            value: item.id,
        });

        return `
            <li class="cart-item d-flex">
                ${checkboxProduct.toString()}
                <a class="cart-item__link d-flex w-100" data-href="/product/${item.id}" href="">
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
                                    <p class="cart-item__one-price">
                                        <span class="cart-item__one-price--value">${item.id} €</span>
                                        per item
                                    </p>
                                </div>
                            </div>
                            <div class="cart-item__nav d-flex align-items-start">
                                <div data-exception="true" class="cart-item__quanity d-flex align-items-center justify-content-between">
                                    <button data-exception="true" class="cart-quanity__btn cart-quanity__btn--minus" type="button"></button>
                                    <span class="cart-quanity__value">${item.count}</span>
                                    <button data-exception="true" class="cart-quanity__btn cart-quanity__btn--plus" type="button"></button>
                                </div>
                                <div class="cart-item__price">
                                    ${item.count * item.id} €
                                </div>
                            </div>
                        </li>
                    </ul>
                </a>
            </li>
        `;
    }

    update() {
        const products = this.cart.cartPagination.getProducts(this.cart.cartLS.cart?.products);

        this.updateProductsList(products);
    }

    rendered() {
        const products = this.cart.paginationStore.getProducts(this.cart.cartLS.cart?.products);

        this.updateProductsList(products);
    }

    updateProductsList(products: Array<Product>) {
        const productsWrapper = document.querySelector('.cart-products');

        if (productsWrapper) {
            productsWrapper.innerHTML = '';

            if (!products.length) {
                productsWrapper.insertAdjacentHTML('afterbegin', '<div class="">Page is empty...</div>');
            } else {
                productsWrapper.insertAdjacentHTML('afterbegin', this.toString());
            }
        }
    }
}

export default CartProducts;
