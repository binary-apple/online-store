import CartFacade from '../../../model/cart/cart-facade';

class RemoveSelectedProducts {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        this.cart = cart;
    }

    init() {
        const removeBtn = document.querySelector('.cart-remove-selected__btn');

        if (removeBtn) {
            const products = document.querySelector('.cart-products');

            if (products) {
                removeBtn.addEventListener('click', () => {
                    const checkboxs = products.querySelectorAll('.checkbox-fake__input');

                    if (checkboxs.length) {
                        checkboxs.forEach((item) => {
                            const inputItem = item as HTMLInputElement;

                            if (inputItem.checked) {
                                const { value } = inputItem;

                                if (value) {
                                    this.cart.removeProduct(+value);
                                }
                            }
                        });

                        const selectAllCb = document.getElementById('select-all');

                        if (selectAllCb) {
                            (selectAllCb as HTMLInputElement).checked = false;
                        }
                    }
                });
            }
        }
    }
}

export default RemoveSelectedProducts;
