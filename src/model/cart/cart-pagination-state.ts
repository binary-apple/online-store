import { ICartPagination } from '../types/cart';
import { Product } from '../types/product';
import { Store } from '../store';
import { Cart } from './cart';
import CartLocalStorage from './cart-local-storage';

class CartPaginationState extends Store {
    paginationState: ICartPagination;
    cart: Cart;
    cartLocalStorage: CartLocalStorage;

    constructor(cart: Cart, cartLocalStorage: CartLocalStorage) {
        super();
        this.cartLocalStorage = cartLocalStorage;

        const storageCart = this.cartLocalStorage.cart;

        if (storageCart.params) {
            this.paginationState = {
                limit: storageCart.params.limit,
                page: storageCart.params.page,
            };
        } else {
            this.paginationState = {
                limit: 3,
                page: 1,
            };
        }

        this.cart = cart;
    }

    public get pagination() {
        return this.paginationState;
    }

    public getProducts(products: Array<Product>) {
        const { page, limit } = this.paginationState;

        const start = page === 1 ? 0 : limit * (page - 1);
        const end = page === 1 ? limit : start + limit;

        const productsItems = products.slice(start, end);

        if (!products.length) {
            return [];
        }

        return productsItems;
    }

    public setPagination(pagination: ICartPagination) {
        const isIncreasePage = pagination.page < pagination.newPage;

        const pageProducts = this.cartLocalStorage.cart.products;
        const maxPage = Math.ceil(pageProducts?.length / this.paginationState.limit);

        if (isIncreasePage) {
            if (maxPage >= pagination.newPage) {
                pagination.page = pagination.newPage;
            }
        } else {
            if (pagination.newPage < 1) {
                pagination.page = 1;
            } else {
                pagination.page = pagination.newPage;
            }
        }

        delete pagination.newPage;

        this.paginationState = Object.assign(this.paginationState, pagination);

        this.notify();

        return this.paginationState;
    }

    public showProducts(prodcutsOnPage: Array<Product>, products: Array<Product>) {
        if (!prodcutsOnPage.length && products.length) {
            this.paginationState.newPage = this.paginationState.page - 1;

            const paginationItem = this.setPagination(this.paginationState);
            this.cartLocalStorage.savePagination(paginationItem);

            return paginationItem;
        }
    }
}

export default CartPaginationState;
