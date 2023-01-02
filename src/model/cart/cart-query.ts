import Router from 'vanilla-router';
import Utils from '../../utils/utils';
import { CartPagination } from '../types/cart';
import CartLocalStorage from './cart-local-storage';

const utils = new Utils();
const cartLocalStorage = new CartLocalStorage();

class CartQuery {
    init(pagination: CartPagination, router: Router) {
        const url = new URL(window.location.href);

        if (!url.search) {
            this.changeParams(pagination, router);
        } else {
            const pagination = utils.queryToObject(url.search) as unknown as Partial<CartPagination>;

            this.changeParams(pagination, router);
        }
    }

    changeParams(pagination: Partial<CartPagination>, router: Router) {
        const url = new URL(window.location.href);

        if (pagination.limit) {
            url.searchParams.set('limit', '' + pagination.limit);
        }

        if (pagination.page) {
            url.searchParams.set('page', '' + pagination.page);
        }

        cartLocalStorage.setFilter(url.search);

        router.navigateTo(url.pathname + url.search, null, true);
    }

    getSearchObj(pagination: CartPagination, isLastPage?: boolean) {
        const search = utils.getSearchString(window.location.href);

        const searchObj: Partial<CartPagination> = {};

        if (search) {
            const searchArr = search.split('?')[search.split('?').length - 1].split('&');

            if (searchArr.length) {
                searchArr.forEach((item) => {
                    const [key, value] = item.split('=');

                    if (key === 'page' && isLastPage) {
                        searchObj[key] = +value - 1;
                    } else {
                        searchObj[key] = +value;
                    }
                });
            }
        } else {
            searchObj.limit = pagination.limit;
            searchObj.page = pagination.page;
        }

        return searchObj;
    }
}

export default CartQuery;
