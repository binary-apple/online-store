import { Modal } from 'bootstrap';
import { Cart } from '../../model/cart/cart';
import { IPromoCode } from '../../model/types/cart';
import { Component } from '../types/component';

class CartTotalBoard extends Component {
    cart: Cart;
    modalElem = {} as Modal;

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

    public toString() {
        return this.getTotalInformation();
    }

    public inputHandlerPromoCode() {
        const input = document.querySelector('.cart-total__promo');

        if (input) {
            input.addEventListener('input', (e: Event) => {
                const inputTarget = e.target as HTMLInputElement;
                const value = inputTarget.value;

                const existPromo = this.cart.getExistPromocodes();
                const currentPromos = this.cart.getConfirmedPromocodes();

                const hasCoincedence = existPromo.get(value) && !currentPromos.map((item) => item.name).includes(value);

                if (hasCoincedence) {
                    const modal = document.querySelector('.modal');

                    if (modal) {
                        this.modalElem = new Modal(modal);

                        modal.addEventListener('show.bs.modal', () => {
                            const promoWrapper = modal.querySelector('b') as HTMLElement;
                            if (promoWrapper) {
                                promoWrapper.innerText = value;
                            }
                        });

                        this.modalElem.show();
                        inputTarget.blur();

                        modal.addEventListener('hidden.bs.modal', () => {
                            const promoWrapper = modal.querySelector('b') as HTMLElement;

                            if (promoWrapper) {
                                promoWrapper.innerText = '';
                            }
                        });
                    }
                }
            });
        }
    }

    public confirmPromoCodeClickHandler(callback: (wrapper: HTMLElement) => void) {
        const modal = document.querySelector('.modal-confirm-promo') as HTMLElement;

        if (modal) {
            const confirmBtn = modal.querySelector('.cart-modal__confirm');

            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    callback(modal);

                    this.modalElem.hide();

                    const total = document.querySelector('.cart-board__total-price');

                    if (total) {
                        total.classList.add('through');
                    }

                    const input = document.querySelector('.cart-total__promo') as HTMLInputElement;

                    if (input) {
                        input.value = '';
                        input.focus();
                    }
                });
            }
        }
    }

    public removePromoCodeClickHandler(callback: (e: Event) => void) {
        const wrapper = document.querySelector('.cart-total');

        if (wrapper) {
            wrapper.addEventListener('click', (e) => {
                callback(e);
            });
        }
    }

    private getTotalInformation() {
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

    private getTotalPrice() {
        const totalPrice = this.cart.getTotalPrice().toFixed(2);

        return `
            Total <span class="cart-board__total">${totalPrice} €</span>
        `;
    }

    private getTotalInfo() {
        const totalPrice = this.cart.getCartPrice().toFixed(2);
        const discount = this.cart.getDiscountPrice().toFixed(2);
        const products = this.cart.getTotalCount();

        const through = this.cart.getConfirmedPromocodes().length ? 'cart-board__total-price--through' : '';

        return `
            <li class="cart-info__item d-flex justify-content-between">
                <span>${products} ${products > 1 ? 'products' : 'product'}</span>
                <span class="cart-board__total-price ${through}">${totalPrice} €</span>
            </li>
            <li class="cart-info__item d-flex justify-content-between">
                Discount
                <span class="cart-board__total-discount">${discount} €</span> 
            </li>
        `;
    }

    private getPromocodesTemplate() {
        const promocodes = this.cart.getConfirmedPromocodes();

        const promoTemplate = this.promocodeItem.bind(this);

        return promocodes.map(promoTemplate).join('');
    }

    private promocodeItem(item: IPromoCode) {
        return `
            <span class="cart-total__promo-item d-inline-flex justify-content-between align-items-center">
                <span class="cart-total__promocode">
                    <span class="cart-promocode__name">${item.name}</span>
                    <span>
                        ${item.discount * 100} %
                    </span>
                </span>
                <span class="cart-total__promo-remove"></span>
            </span>`;
    }

    public update() {
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

export default CartTotalBoard;
