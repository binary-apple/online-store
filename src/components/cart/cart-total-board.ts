import { Modal } from 'bootstrap';
import { Cart } from '../../model/cart';
import { IPromoCode } from '../../model/types/cart';
import { Component } from '../types/component';
import Mustache from 'mustache';
import Total from './component/total/total.html';
import TotalInfo from './component/total/totalinfo.html';
import Promocode from './component/promocodes/promocode.html';

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

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public inputHandlerPromoCode() {
        const input = document.querySelector('.cart-total__promo');

        if (input) {
            input.addEventListener('input', (e: Event) => {
                const inputTarget = e.target as HTMLInputElement;
                const value = inputTarget.value;

                const existPromo = this.cart.getExistPromocodes();
                const currentPromos = this.cart.getConfirmedPromocodes();

                const hasCoincedence =
                    existPromo.get(value) && !currentPromos.map((item: IPromoCode) => item.name).includes(value);

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

    public getTemplate() {
        const totalPrice = this.cart.getTotalPrice();
        const totalInfo = this.getTotalInfo();
        const promocodes = this.getPromocodesTemplate();

        return Mustache.render(Total, { totalPrice, totalInfo, promocodes });
    }

    private getTotalInfo() {
        const cartPrice = this.cart.getCartPrice();
        const discount = this.cart.getDiscountPrice();
        const counter = this.cart.getTotalCount();

        const through = this.cart.getConfirmedPromocodes().length ? 'cart-board__total-price--through' : '';
        const word = counter > 1 ? 'products' : 'product';

        return Mustache.render(TotalInfo, { through, counter, cartPrice, discount, word });
    }

    private getPromocodesTemplate() {
        const promocodes = this.cart.getConfirmedPromocodes();

        const promoTemplate = this.promocodeItem.bind(this);

        return promocodes.map(promoTemplate).join('');
    }

    private promocodeItem(item: IPromoCode) {
        const discount = item.discount * 100;

        return Mustache.render(Promocode, { discount, name: item.name });
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
    }
}

export default CartTotalBoard;
