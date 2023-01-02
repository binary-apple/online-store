import { Cart } from '../../model/cart/cart';
import { Component } from '../types/component';

class CartTotal extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super();

        this.cart = cart;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTotalInformation();

        return main.content;
    }

    toString() {
        return this.getTotalInformation();
    }

    getTotalInformation() {
        return `
            <div class="cart-total__board">
                <ul class="cart-board__list">
                    <li class="cart-board__item d-flex justify-content-between">
                        <ul class="cart-board__info w-100">
                            ${this.getTotalInfo()}
                        </ul>
                    </li>
                    <li class="cart-board__item">
                        <input class="cart-total__promo" placeholder="Enter promocode" type="text">
                        <div class="cart-total__promo-note">
                            ${this.getPromocodesTemplate()}                       
                        </div>
                        <p class="cart-total__example">Test promocodes: <span class="cart-total__example-promo">EPM, RS</span></p>
                    </li>
                    <li class="cart-board__item price p d-flex justify-content-between align-items-center">
                        ${this.getTotalPrice()}
                    </li>
                    <li class="cart-board__item">
                        <button type="button" class="cart-board__btn w-100">Make order</button>
                    </li>
                </ul>
            </div>
        `;
    }

    getTotalPrice() {
        const [resultPrice, discountValue] = this.getResultPriceAndDiscount();

        return `
            Total <span class="cart-board__total">${resultPrice - discountValue} €</span>
        `;
    }

    getTotalInfo() {
        const [resultPrice, discountValue] = this.getResultPriceAndDiscount();

        const counter = this.cart.getProductCounter();

        return `
            <li class="cart-info__item d-flex justify-content-between">
                <span>${counter} ${counter > 1 ? 'products' : 'product'}</span>
                <span class="cart-board__total-price">${resultPrice} €</span>
            </li>
            <li class="cart-info__item d-flex justify-content-between">
                Discount
                <span class="cart-board__total-discount">${discountValue} €</span> 
            </li>
        `;
    }

    getResultPriceAndDiscount() {
        const calculatePrice = (id: number) => id;

        const discountValue = this.cart.getDiscount();
        const resultPrice = this.cart.getTotalPrice(calculatePrice);

        return [resultPrice, discountValue];
    }

    getPromocodesTemplate() {
        const allPromo = this.cart.getAllPromocodes();
        const promocodes = this.cart.getPromo();
        const hasPromocodes = !!promocodes.length;
        return `
            ${
                hasPromocodes
                    ? `
                        <p class="cart-total__promo-list">
                            Applied promocodes: ${promocodes
                                .map((item) => {
                                    return `
                                    <span class="cart-total__promo-item d-inline-flex justify-content-between align-items-center">
                                        <span class="cart-total__promocode">
                                            <span class="cart-promocode__name">${item}</span>
                                            <span>
                                                -${allPromo.get(item)} €
                                            </span> 
                                        </span>
                                        <span class="cart-total__promo-remove"></span>
                                    </span>`;
                                })
                                .join('')}
                        </p>`
                    : ''
            }
        `;
    }

    update() {
        const totalInfo = document.querySelector('.cart-board__info');

        if (totalInfo) {
            totalInfo.innerHTML = '';
            totalInfo.innerHTML = this.getTotalInfo();
        }

        const promoNote = document.querySelector('.cart-total__promo-note');

        if (promoNote) {
            promoNote.innerHTML = '';
            promoNote.insertAdjacentHTML('afterbegin', this.getPromocodesTemplate());
        }

        const totalPrice = document.querySelector('.cart-board__item.price');

        if (totalPrice) {
            totalPrice.innerHTML = '';
            totalPrice.innerHTML = this.getTotalPrice();
        }
    }
}

export default CartTotal;
