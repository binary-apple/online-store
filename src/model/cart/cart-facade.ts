import { Store } from '../store';
import { Cart } from './cart';
import CartQuery from './cart-query';
import CartPagination from './cart-pagination-state';
import CartLocalStorage from './cart-local-storage';
import { Product } from '../types/product';
import { ICartPagination } from '../types/cart';

class CartFacade extends Store {
    cartLocalStorage: CartLocalStorage;
    cartPagination: CartPagination;
    cartQuery: CartQuery;
    cart: Cart;

    constructor(
        cartStore: Cart,
        cartStateLess: CartLocalStorage,
        cartPagination: CartPagination,
        cartQuery: CartQuery
    ) {
        super();

        this.cart = cartStore;
        this.cartLocalStorage = cartStateLess;
        this.cartPagination = cartPagination;
        this.cartQuery = cartQuery;
    }

    public get paginationStore() {
        return this.cartPagination;
    }

    public get cartLS() {
        return this.cartLocalStorage;
    }

    public get cartStore() {
        return this.cart;
    }

    public get discount() {
        return this.cart.discount;
    }

    public get productsItems() {
        const products = this.cart.products;

        return this.cartPagination.getProducts(products);
    }

    public get quantityProducts() {
        return this.cartLS.getTotalCount();
    }

    public get pagination() {
        return this.cartPagination.pagination;
    }

    public get cartCost() {
        const callback = (id: number) => id;
        return this.cart.getTotalPrice(callback);
    }

    public get promocodes() {
        return this.cart.promocodes;
    }

    public setPagination(paginationItem: ICartPagination) {
        const pagination = this.cartPagination.setPagination(paginationItem);
        this.cartLocalStorage.savePagination(pagination);
        this.cartQuery.toPrevPage(pagination);
    }

    public addProduct(product: Product, count = 1) {
        const products = this.cart.addProductToCart(product, count);

        if (products) {
            this.cartLocalStorage.saveProducts(products);
        }
    }

    public removeProduct(id: number) {
        const products = this.cart.removeProductFromCart(id);

        if (products) {
            this.cartLocalStorage.saveProducts(products);
            this.cartQuery.toPrevPage();
        }
    }

    public addPromocode(promo: string) {
        this.cart.addPromocode(promo);
    }

    public removePromocode(promo: string) {
        this.cart.removePromocode(promo);
    }

    public increaseProductQuantity(product: Product) {
        const products = this.cart.increaseProductCount(product);

        if (products) {
            this.cartLocalStorage.saveProducts(products);
        }
    }

    public decreaseProductQuntity(id: number) {
        const products = this.cart.decreaseProductCount(id);

        if (products) {
            this.cartLocalStorage.saveProducts(products);
            this.cartQuery.toPrevPage();
        }
    }
}

export default CartFacade;
