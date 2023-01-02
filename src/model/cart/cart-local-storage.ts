import Utils from '../../utils/utils';
import { CartItem } from '../types/cart';

const utils = new Utils();

class CartLocalStorage {
    public get() {
        const cart = localStorage.getItem('cart-store-apple-nepo');

        if (cart) {
            return JSON.parse(cart);
        }

        return {};
    }

    public setFilter(search: string) {
        const searchObj = utils.queryToObject(search);

        const cart = this.get();

        cart.params = {};

        const newCart = {
            ...cart,
        };

        newCart.params = Object.assign(cart.params, searchObj);

        localStorage.setItem('cart-store-apple-nepo', JSON.stringify({ ...newCart }));
    }

    public updateProducts(product: CartItem, type: string) {
        const cart = this.get();

        if (cart.products) {
            if (type === 'push') {
                cart.products.push(product);
            } else if (type === 'remove') {
                const index = cart.products.findIndex((el: CartItem) => el.productId === product.productId);

                if (index > -1) {
                    cart.products.splice(index, 1);

                    cart.products.map((item: CartItem, index: number) => (item.order = index + 1));
                }
            } else if (type === 'replace') {
                const index = cart.products.findIndex((el: CartItem) => el.productId === product.productId);

                if (index > -1) {
                    cart.products.splice(index, 1, product);

                    cart.products.map((item: CartItem, index: number) => (item.order = index + 1));
                }
            }
        } else {
            cart.products = [];
            cart.products.push(product);
        }

        localStorage.setItem('cart-store-apple-nepo', JSON.stringify({ ...cart }));
    }
}

export default CartLocalStorage;
