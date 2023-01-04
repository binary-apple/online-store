import CartFacade from '../../../model/cart/cart-facade';
import { Modal } from 'bootstrap';

class PromoCode {
    cart: CartFacade;
    modalElem = {} as Modal;

    constructor(cart: CartFacade) {
        this.cart = cart;
    }

    public init() {
        this.addPromo();
        this.removePromo();
    }

    private addPromo() {
        const input = document.querySelector('.cart-total__promo');

        if (input) {
            const [promocodes, existPromo] = this.cart.promocodes;

            this.confirmPromo();

            input.addEventListener('input', (e) => {
                const htmlTarget = e.target as HTMLInputElement;
                const { value } = htmlTarget;

                const findPromo = existPromo.get(value) && !promocodes.includes(value);

                if (findPromo) {
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
                        htmlTarget.blur();

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

    public confirmPromo() {
        const modal = document.querySelector('.modal');

        if (modal) {
            const confirmBtn = modal.querySelector('.cart-modal__confirm');

            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    const promoWrapper = modal.querySelector('b') as HTMLElement;

                    if (promoWrapper) {
                        const promo = promoWrapper.innerText.trim();
                        this.cart.addPromocode(promo);

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
                    }
                });
            }
        }
    }

    private removePromo() {
        const list = document.querySelector('.cart-board__list');

        if (list) {
            list.addEventListener('click', (e) => {
                const htmlTarget = e.target as HTMLElement;

                const isRemoveTag = htmlTarget.classList.contains('cart-total__promo-remove');

                if (isRemoveTag) {
                    const promo = (
                        htmlTarget
                            .closest('.cart-total__promo-item')
                            ?.querySelector('.cart-promocode__name') as HTMLElement
                    )?.innerText.trim();

                    this.cart.removePromocode(promo);

                    const promocodes = this.cart.promocodes;

                    if (!promocodes.length) {
                        const total = document.querySelector('.cart-board__total-price');
                        if (total) {
                            total.classList.remove('through');
                        }
                    }
                }
            });
        }
    }
}

export default PromoCode;
