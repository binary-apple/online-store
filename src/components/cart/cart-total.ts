import CartFacade from '../../model/cart/cart-facade';
import { Component } from '../types/component';

class CartTotal extends Component {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        super();

        this.cart = cart;

        this.subscribe(this.cart.cartStore);
        this.subscribe(this.cart.cartLS);
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
        const promos = this.getPromocodesTemplate.bind(this);
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
                            ${promos()}                       
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
        const resultPrice = this.cart.cartCost;
        const discountValue = this.cart.discount;

        return `
            Total <span class="cart-board__total">${resultPrice - discountValue} €</span>
        `;
    }

    getTotalInfo() {
        const resultPrice = this.cart.cartCost;
        const discountValue = this.cart.discount;

        const counter = this.cart.quantityProducts;

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

    getPromocodesTemplate() {
        const [promocodes, existPromo] = this.cart.promocodes;

        const hasPromocodes = !!promocodes.length;

        const promocodeItem = this.promocodeItem.bind(this, existPromo);

        const promocodesTemplates = promocodes.map(promocodeItem).join('');

        return `
            ${
                hasPromocodes
                    ? `
                        <p class="cart-total__promo-list">
                            Applied promocodes:
                            ${promocodesTemplates}
                        </p>`
                    : ''
            }
        `;
    }

    promocodeItem(existPromo: Map<string, number>, item: string) {
        const discount = existPromo.get(item);

        return `
            <span class="cart-total__promo-item d-inline-flex justify-content-between align-items-center">
                <span class="cart-total__promocode">
                    <span class="cart-promocode__name">${item}</span>
                    <span>
                        -${discount} €
                    </span>
                </span>
                <span class="cart-total__promo-remove"></span>
            </span>`;
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
