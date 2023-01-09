import { View } from './types/view';
import BaseView from './base-view';
import CartContent from '../components/cart/cart-content';
import BreadCrumbs from '../components/breadcrumbs';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Cart } from '../model/cart';
import { Modal } from 'bootstrap';
import { Product } from '../model/types/product';

class CartView extends BaseView implements View {
    private content: CartContent;
    private breadcrumbs: BreadCrumbs;
    private header: Header;
    private footer: Footer;
    cart: Cart;
    modalElem = {} as Modal;

    constructor(cart: Cart) {
        super();

        this.cart = cart;

        this.header = new Header(cart);
        this.footer = new Footer();

        const breadcrumbs = this.getBreadcrumbs();

        this.breadcrumbs = new BreadCrumbs(breadcrumbs);
        this.content = new CartContent(cart);
    }

    public init() {
        this.root.append(this.header.render());
        this.root.append(this.container);
        this.container.append(this.breadcrumbs.render());
        this.container.append(this.content.render());
        this.root.append(this.footer.render());

        this.selectAllChangeHandler();
        this.inputHandlerPromoCode();
        this.setPersonInfo();
    }

    private getBreadcrumbs() {
        return [
            {
                link: '/',
                name: 'Main',
            },
            {
                link: '/cart',
                name: 'Cart',
            },
        ];
    }

    public breadCrumbsClickHandler(callback: (e: Event) => void) {
        this.breadcrumbs.breadCrumbsClickHandler(callback);
    }

    public removeSelectedClickHandler(callback: (checkboxs: Array<HTMLInputElement>) => void) {
        this.content.cartNavigation.removeSelectedClickHandler(callback);
    }

    public changeLimitPaginationHandler(callback: (target: HTMLInputElement) => void) {
        this.content.cartNavigation.changeLimitPaginationHandler(callback);
    }

    public changePagePaginationClickHandler(callback: (e: Event, type: string) => void) {
        this.content.cartNavigation.changePagePaginationClickHandler(callback);
    }

    public changeQuntityProductInCart(callback: (e: Event, type: string, productId: number) => void) {
        this.content.cartProducts.changeQuntityProductInCart(callback);
    }

    public productLinkClickHandler(callback: (e: Event) => void) {
        this.content.cartProducts.productLinkClickHandler(callback);
    }

    public confirmPromoCodeClickHandler(callback: (promo: string) => void) {
        this.content.cartTotal.confirmPromoCodeClickHandler(callback);
    }

    public removePromoCodeClickHandler(callback: (promo: string) => void) {
        this.content.cartTotal.removePromoCodeClickHandler(callback);
    }

    public inputHandlerPromoCode() {
        this.content.cartTotal.inputHandlerPromoCode();
    }

    public selectAllChangeHandler() {
        this.content.cartNavigation.selectAllChangeHandler();
    }

    public makeOrder(callback: (products: Array<Product>) => void, redirect: () => void, auto?: boolean) {
        this.content.makeOrder(callback, redirect, auto);
    }

    public setPersonInfo() {
        this.content.setPersonInfo();
    }
}

export default CartView;
