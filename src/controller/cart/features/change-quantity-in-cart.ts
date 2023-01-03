import CartFacade from '../../../model/cart/cart-facade';

class ChangeQuanityInCart {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        this.cart = cart;
    }

    init() {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener(
                'click',
                (e) => {
                    const htmlTarget = e.target as HTMLElement;

                    if (htmlTarget.dataset.exception) {
                        e.preventDefault();
                    }

                    const productId = +(
                        htmlTarget.closest('.cart-item')?.querySelector('.checkbox-fake__input') as HTMLInputElement
                    )?.value;

                    if (productId) {
                        const isIncrease = htmlTarget.classList.contains('cart-quanity__btn--plus');

                        if (isIncrease) {
                            const product = this.cart.productsItems.find((el) => el.id === +productId);

                            if (product) {
                                this.cart.increaseProductQuantity(product);
                            }
                        }

                        const isDecrease = htmlTarget.classList.contains('cart-quanity__btn--minus');

                        if (isDecrease) {
                            this.cart.decreaseProductQuntity(productId);
                        }
                    }
                },
                true
            );
        }
    }
}

export default ChangeQuanityInCart;
