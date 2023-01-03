import Router from 'vanilla-router';
import { ICartLocalStorage, ICartPagination } from '../types/cart';
import CartPaginationState from './cart-pagination-state';
import CartLocalStorage from './cart-local-storage';
import Utils from '../../utils/utils';

const utils = new Utils();

class CartQuery {
    cartPagination: CartPaginationState;
    router: Router;
    cartLocalStorage: CartLocalStorage;

    constructor(cartPagination: CartPaginationState, cartLocalStorage: CartLocalStorage, router: Router) {
        this.cartPagination = cartPagination;
        this.router = router;
        this.cartLocalStorage = cartLocalStorage;

        this.changeQuery();
    }

    changeQuery(pagination?: ICartPagination) {
        const url = new URL(window.location.href);

        const initialize = !pagination;

        if (initialize) {
            const loadCart = this.cartLocalStorage.cart;

            if (!url.search) {
                this.emptyQuery(loadCart);
            } else {
                this.hasQuery();
            }
        } else {
            if (pagination?.limit) {
                url.searchParams.set('limit', '' + pagination.limit);
            }

            if (pagination?.page) {
                url.searchParams.set('page', '' + pagination.page);
            }

            this.router.navigateTo(url.pathname + url.search, '', true);
        }
    }

    emptyQuery(loadCart: ICartLocalStorage) {
        const url = new URL(window.location.href);

        const paginationDefault = {
            limit: 3,
            page: 1,
            newPage: 1,
        };

        if (!loadCart?.params) {
            const paginationItem = this.cartPagination.setPagination(paginationDefault);
            this.cartLocalStorage.savePagination(paginationItem);

            url.searchParams.set('limit', '' + paginationItem.limit);
            url.searchParams.set('page', '' + paginationItem.page);
            this.router.navigateTo(url.pathname + url.search, '', true);
        } else {
            const cart = this.cartLocalStorage.cart;
            url.searchParams.set('limit', '' + cart.params.limit);
            url.searchParams.set('page', '' + cart.params.page);

            this.router.navigateTo(url.pathname + url.search, '', true);
        }
    }

    hasQuery() {
        const url = new URL(window.location.href);

        const searchParams = utils.queryToObject(url.search) as unknown as ICartPagination;
        searchParams.newPage = searchParams.page;

        const search = this.cartPagination.setPagination(searchParams);
        this.cartLocalStorage.savePagination(search);

        url.searchParams.set('limit', '' + searchParams.limit);
        url.searchParams.set('page', '' + searchParams.page);

        this.router.navigateTo(url.pathname + url.search, '', true);
    }

    toPrevPage(pagination?: ICartPagination) {
        const changed = this.cartPagination.showProducts(
            this.cartPagination.getProducts(this.cartLocalStorage.cart.products),
            this.cartLocalStorage.cart.products
        );

        if (pagination) {
            if (changed) {
                this.changeQuery(changed);
            } else {
                this.changeQuery(pagination);
            }
        } else {
            if (changed) {
                this.changeQuery(changed);
            }
        }
    }
}

export default CartQuery;
