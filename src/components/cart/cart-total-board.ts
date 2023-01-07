import { Modal } from 'bootstrap';
import { Cart } from '../../model/cart';
import { IPromoCode } from '../../model/types/cart';
import { Component } from '../types/component';

const Total = require('./component/total/total.html');
const TotalInfo = require('./component/total/totalinfo.html');
const Promocode = require('./component/promocodes/promocode.html');

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

    public confirmPromoCodeClickHandler(callback: (promo: string) => void) {
        const modal = document.querySelector('.modal-confirm-promo') as HTMLElement;

        if (modal) {
            const confirmBtn = modal.querySelector('.cart-modal__confirm');

            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    if (modal) {
                        const promoWrapper = modal.querySelector('b') as HTMLElement;

                        if (promoWrapper) {
                            const promo = promoWrapper.innerText.trim();
                            callback(promo);
                        }
                    }

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

    public removePromoCodeClickHandler(callback: (promo: string) => void) {
        const wrapper = document.querySelector('.cart-total');

        if (wrapper) {
            wrapper.addEventListener('click', (e) => {
                const htmlTarget = e.target as HTMLElement;

                const isRemovePromocodeBtn = htmlTarget.classList.contains('cart-total__promo-remove');

                if (isRemovePromocodeBtn) {
                    const promoItem = htmlTarget.closest('.cart-total__promo-item');

                    if (promoItem) {
                        const promoNameWrapper = promoItem.querySelector('.cart-promocode__name') as HTMLElement;

                        if (promoNameWrapper) {
                            const promo = promoNameWrapper.innerText.trim();
                            callback(promo);
                        }
                    }
                }
            });
        }
    }

    public getTemplate() {
        const totalPrice = this.cart.getTotalPrice();
        const totalInfo = this.getTotalInfo();
        const promocodes = this.getPromocodesTemplate();

        return Total({ totalPrice, totalInfo, promocodes });
    }

    private getTotalInfo() {
        const cartPrice = this.cart.getCartPrice();
        const discount = this.cart.getDiscountPrice();
        const counter = this.cart.getTotalCount();

        const through = this.cart.getConfirmedPromocodes().length ? 'cart-board__total-price--through' : '';
        const word = counter > 1 ? 'products' : 'product';

        return TotalInfo({ through, counter, cartPrice, discount, word });
    }

    private getPromocodesTemplate() {
        const promocodes = this.cart.getConfirmedPromocodes();

        const promoTemplate = this.promocodeItem.bind(this);

        return promocodes.map(promoTemplate).join('');
    }

    private promocodeItem(item: IPromoCode) {
        const discount = item.discount * 100;

        return Promocode({ discount, name: item.name });
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
            promoNote.innerHTML = this.getPromocodesTemplate();
        }

        const totalWrapper = document.querySelector('.cart-total') as HTMLElement;
        const cartNav = document.querySelector('.cart-content__remove-selected') as HTMLElement;

        if (totalWrapper && cartNav) {
            const products = this.cart.get();
            if (!products.length) {
                totalWrapper.classList.add('hide');
                cartNav.classList.add('hide');
            } else {
                totalWrapper.classList.remove('hide');
                cartNav.classList.remove('hide');
            }
        }
    }
}

export default CartTotalBoard;
