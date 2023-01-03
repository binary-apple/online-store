import Confirm from '../../../components/confirm';
import CartFacade from '../../../model/cart/cart-facade';

class PromoCode {
    cart: CartFacade;

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

            const confirm = this.confirmPromo.bind(this);

            input.addEventListener('input', (e) => {
                const htmlTarget = e.target as HTMLInputElement;
                const { value } = htmlTarget;

                const findPromo = existPromo.get(value) && !promocodes.includes(value);

                if (findPromo) {
                    const text = `Вы действительно хотите применить промокод: <span class="confirm-window__value">${value}</span>?`;

                    const applyPromo = new Confirm({
                        text,
                        confirm,
                    });

                    htmlTarget.blur();
                    applyPromo.open();
                }
            });
        }
    }

    public confirmPromo() {
        const promoSpan = document.querySelector('.confirm-window__value') as HTMLElement;

        if (promoSpan) {
            const promo = promoSpan.innerText.trim();

            this.cart.addPromocode(promo);

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
