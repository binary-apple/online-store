import Utils from '../../utils/utils';
import { Store } from '../store';
import { ICartLocalStorage, ICartPagination } from '../types/cart';
import { Product } from '../types/product';

const utils = new Utils();

class CartLocalStorage extends Store {
    name: string;

    constructor(name: string) {
        super();

        this.name = name;

        this.init();
    }

    init() {
        const cart = localStorage.getItem(this.name);

        if (!cart) {
            const jsonCart = JSON.stringify({});

            localStorage.setItem('online-store-apple-nepo', jsonCart);
        }
    }

    public getTotalCount() {
        const cartJSON = localStorage.getItem(this.name);

        if (cartJSON) {
            const cart = JSON.parse(cartJSON);

            return cart.products?.reduce((acc: number, cur: Product) => acc + cur.count, 0);
        }

        return 0;
    }

    public get cart() {
        const cart = localStorage.getItem(this.name);

        if (cart) {
            return JSON.parse(cart);
        }

        return undefined;
    }

    public get paginationParams() {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);

            return localStorageCart.params;
        }
    }

    savePagination(pagination: ICartPagination) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);
            localStorageCart.params = { ...pagination };

            this.update(localStorageCart);
        }
    }

    saveProducts(products: Array<Product>) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);

            localStorageCart.products = [...products];

            this.update(localStorageCart);
            this.notify();
        }
    }

    private update(localStorageCart: ICartLocalStorage) {
        const updatedCartJSON = JSON.stringify(localStorageCart);

        localStorage.removeItem(this.name);
        localStorage.setItem(this.name, updatedCartJSON);
    }
}

export default CartLocalStorage;
