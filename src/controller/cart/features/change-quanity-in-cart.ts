import { Cart } from '../../../model/cart/cart';

class ChangeQuanityInCart {
    cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    init() {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener('click', (e) => {
                const htmlTarget = e.target as HTMLElement;

                const productId = +(
                    htmlTarget.closest('.cart-item')?.querySelector('.checkbox-fake__input') as HTMLInputElement
                )?.value;

                if (productId) {
                    const isIncrease = htmlTarget.classList.contains('cart-quanity__btn--plus');

                    if (isIncrease) {
                        this.cart.increaseProductCount(productId);
                    }

                    const isDecrease = htmlTarget.classList.contains('cart-quanity__btn--minus');

                    if (isDecrease) {
                        this.cart.decreaseProductCount(productId);
                    }
                }
            });
        }
    }
}

export default ChangeQuanityInCart;
