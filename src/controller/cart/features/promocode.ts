import { Cart } from '../../../model/cart/cart';
import Confirm from '../../../components/confirm';

class PromoCode {
    cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    public init() {
        this.addPromo();
        this.removePromo();
    }

    private addPromo() {
        const input = document.querySelector('.cart-total__promo');

        if (input) {
            const promocodes = this.cart.getAllPromocodes();
            const promo = this.cart.getPromo();
            const promoKeys = [...promocodes.keys()];

            input.addEventListener('input', (e) => {
                const htmlTarget = e.target as HTMLInputElement;
                const { value } = htmlTarget;

                const findedPromo = promoKeys.find((el) => el === value && !promo.includes(value));

                if (findedPromo) {
                    this.cart.addPromoToWait(value);
                    const applyPromo = new Confirm(`Вы действительно хотите применить промокод: ${value}?`);

                    htmlTarget.blur();
                    applyPromo.open();
                }
            });
        }
    }

    public applyPromo() {
        const cart = this as unknown as Cart;
        const [promo] = cart.getWaitPromo();

        cart.addPromocode(promo);
        cart.removePromoFromWait(promo);

        const confirm = document.querySelector('.confirm');

        if (confirm) {
            confirm.remove();
        }

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

                    const promocodes = this.cart.getPromo();

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
