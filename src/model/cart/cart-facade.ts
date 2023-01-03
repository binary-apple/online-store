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
        return this.cart.getTotalCount();
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

        const changed = this.cartPagination.showProducts(this.productsItems, this.cart.products);

        if (changed) {
            this.cartQuery.changeQuery(changed);
        } else {
            this.cartQuery.changeQuery(pagination);
        }
    }

    public addProduct(product: Product, count = 1) {
        this.cartLocalStorage.saveProduct(product, count);
        this.cart.addProductToCart(product, count);
    }

    public removeProduct(id: number) {
        this.cart.removeProductFromCart(id);
        this.cartLocalStorage.removeProduct(id);

        const changed = this.cartPagination.showProducts(this.productsItems, this.cart.products);

        if (changed) {
            this.cartQuery.changeQuery(changed);
        }
    }

    public addPromocode(promo: string) {
        this.cart.addPromocode(promo);
    }

    public removePromocode(promo: string) {
        this.cart.removePromocode(promo);
    }

    public increaseProductQuantity(product: Product) {
        this.cart.increaseProductCount(product);
        this.cartLocalStorage.increaseProduct(product);
    }

    public decreaseProductQuntity(id: number) {
        this.cart.decreaseProductCount(id);
        this.cartLocalStorage.decreaseProduct(id);

        const changed = this.cartPagination.showProducts(
            this.cartPagination.getProducts(this.cartLocalStorage.cart.products),
            this.cartLocalStorage.cart.products
        );

        if (changed) {
            this.cartQuery.changeQuery(changed);
        }
    }
}

export default CartFacade;
