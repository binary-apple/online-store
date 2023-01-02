import { CartPagination } from '../types/cart';
import { Store } from '../store';
import { CartItem } from '../types/cart';
import CartQuery from './cart-query';
import Router from 'vanilla-router';
import Utils from '../../utils/utils';
import CartLocalStorage from './cart-local-storage';

const cartQuery = new CartQuery();
const utils = new Utils();
const cartLocalStorage = new CartLocalStorage();

export class Cart extends Store {
    public productsInCart: Array<CartItem>;
    public allPromocodes: ReadonlyMap<string, number>;
    public promoList: Array<string>;
    public totalDisc: number;
    renderedProducts: Array<CartItem>;
    pagination: CartPagination;
    router: Router;
    waitPromo: Array<string>;

    constructor(router: Router) {
        super();
        this.productsInCart = cartLocalStorage.get()?.products || [];
        this.allPromocodes = new Map<string, number>([
            ['EPM', 0.1],
            ['RS', 0.1],
        ]);
        this.promoList = [];
        this.totalDisc = 0;
        this.renderedProducts = [];
        this.waitPromo = [];

        this.pagination = {
            limit: 3,
            page: 1,
        };

        this.router = router;

        cartQuery.init(this.pagination, router);

        this.setPagination(this.pagination);
    }

    public getProductCounter() {
        return this.productsInCart.reduce((initial, current) => {
            return initial + current.count;
        }, 0);
    }

    public getProducts() {
        const [start, end] = this.getStartAndEnd();

        this.renderedProducts = this.productsInCart.slice(start, end);

        if (!this.renderedProducts.length) {
            this.pagination.page = this.pagination.page - 1 > 1 ? this.pagination.page - 1 : 1;

            const [startIndex, endIndex] = this.getStartAndEnd(true);

            cartQuery.changeParams(this.pagination, this.router);

            this.renderedProducts = this.productsInCart.slice(startIndex, endIndex);

            return this.renderedProducts;
        }

        return this.renderedProducts;
    }

    private getStartAndEnd(isLastPage?: boolean) {
        const searchObj = cartQuery.getSearchObj(this.pagination, isLastPage);
        this.pagination = Object.assign(this.pagination, searchObj);

        const pageSize = this.pagination.limit;

        const startPage = this.pagination.page === 1 ? 0 : pageSize * (this.pagination.page - 1);
        const endPage = this.pagination.page === 1 ? pageSize : startPage + pageSize;

        return [startPage, endPage];
    }

    public getPromo() {
        return this.promoList;
    }

    public getDiscount() {
        return this.totalDisc;
    }

    public getAllPromocodes() {
        return this.allPromocodes;
    }

    public getPagination() {
        if (this.pagination.page === 0) {
            this.pagination.page = 1;
        }

        return this.pagination;
    }

    public setPagination(pagination: Partial<CartPagination>) {
        this.pagination = { ...Object.assign(this.pagination, pagination) };

        if (this.pagination.page < 1) {
            this.pagination.page = 1;
        }

        cartQuery.changeParams(this.pagination, this.router);

        this.notify();
    }

    public getTotalPrice(getPriceById: (id: number) => number) {
        return this.productsInCart.reduce(
            (acc: number, cur: CartItem) => acc + getPriceById(cur.productId) * cur.count,
            0
        );
    }

    public getDiscountPrice(getPriceById: (id: number) => number) {
        return this.getTotalPrice(getPriceById) * (1 - this.totalDisc);
    }

    public getTotalCount() {
        return this.productsInCart.reduce((acc: number, cur: CartItem) => acc + cur.count, 0);
    }

    public addProductToCart(productId: number, count = 1) {
        const product = { productId: productId, count: count, order: this.productsInCart.length + 1 };
        this.productsInCart.push(product);

        cartLocalStorage.updateProducts(product, 'push');

        this.notify();
    }

    public removeProductFromCart(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);

        if (productIdInCart >= 0) {
            const productInCart = this.productsInCart.find((el) => el.productId === productId);

            if (productInCart) {
                cartLocalStorage.updateProducts(productInCart, 'remove');
            }

            this.productsInCart.splice(productIdInCart, 1);

            this.productsInCart.map((item, index) => (item.order = index + 1));

            this.notify();
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public increaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);
        if (productIdInCart >= 0) {
            this.productsInCart[productIdInCart].count += 1;

            cartLocalStorage.updateProducts(this.productsInCart[productIdInCart], 'replace');

            this.notify();
        } else {
            cartLocalStorage.updateProducts({} as CartItem, 'push');
            this.addProductToCart(productId, 1);
        }
    }

    public decreaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);
        if (productIdInCart >= 0) {
            if (this.productsInCart[productIdInCart].count === 1) {
                this.removeProductFromCart(productId);
            } else {
                this.productsInCart[productIdInCart].count -= 1;

                cartLocalStorage.updateProducts(this.productsInCart[productIdInCart], 'replace');
                this.notify();
            }
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public addPromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        if (disc && this.promoList.indexOf(promo) < 0) {
            this.promoList.push(promo);
            this.totalDisc += disc;
            this.notify();
        }
    }

    public removePromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        const promoId = this.promoList.indexOf(promo);
        if (disc && promoId >= 0) {
            this.promoList.splice(promoId, 1);
            this.totalDisc -= disc;
            this.notify();
        }
    }

    public addPromoToWait(promo: string) {
        this.waitPromo.push(promo);
    }

    public removePromoFromWait(promo: string) {
        const index = this.waitPromo.indexOf(promo);

        if (index > -1) {
            this.waitPromo.splice(index, 1);
        }
    }

    public getWaitPromo() {
        return this.waitPromo;
    }
}
