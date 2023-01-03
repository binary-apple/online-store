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

    saveProduct(product: Product, count = 1) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);

            const productItem = utils.createProduct(product, count, localStorageCart.products);

            if (localStorageCart.products) {
                localStorageCart.products.push(productItem);
            } else {
                localStorageCart.products = [];
                localStorageCart.products.push(productItem);
            }

            this.update(localStorageCart);

            this.notify();
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

    removeProduct(id: number) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);

            if (localStorageCart.products) {
                localStorageCart.products = localStorageCart.products.filter((el: Product) => el.id !== id);

                this.update(localStorageCart);

                this.notify();
            }
        }
    }

    increaseProduct(product: Product) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);
            const index = localStorageCart.products.findIndex((el: Product) => el.id === product.id);

            if (index >= 0) {
                if (localStorageCart.products) {
                    localStorageCart.products[index].count += 1;
                } else {
                    localStorageCart.products = [];
                    const productItem = utils.createProduct(product, product.count + 1, localStorageCart.products);
                    localStorageCart.products.push(productItem);
                }
            }

            this.update(localStorageCart);

            this.notify();
        }
    }

    decreaseProduct(id: number) {
        const jsonCart = localStorage.getItem(this.name);

        if (jsonCart) {
            const localStorageCart = JSON.parse(jsonCart);

            if (localStorageCart.products.length) {
                const index = localStorageCart.products.findIndex((el: Product) => el.id === id);

                const count = localStorageCart.products[index].count;

                if (count === 1) {
                    localStorageCart.products.splice(index, 1);
                } else {
                    localStorageCart.products[index].count -= 1;
                }

                this.update(localStorageCart);

                this.notify();
            }
        }
    }

    private update(localStorageCart: ICartLocalStorage) {
        const updatedCartJSON = JSON.stringify(localStorageCart);

        localStorage.removeItem(this.name);
        localStorage.setItem(this.name, updatedCartJSON);
    }
}

export default CartLocalStorage;
