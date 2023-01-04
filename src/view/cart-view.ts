import { View } from './types/view';
import BaseView from './base-view';
import CartContent from '../components/cart/cart-content';
import BreadCrumbs from '../components/breadcrumbs';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Cart } from '../model/cart/cart';

class CartView extends BaseView implements View {
    private content: CartContent;
    private breadcrumbs: BreadCrumbs;
    private header: Header;
    private footer: Footer;

    constructor(cart: Cart) {
        super();

        this.header = new Header();
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

    public selectAllChangeHandler(callback: (e: Event, container: HTMLElement) => void) {
        this.content.selectAllProducts.selectAllChangeHandler(callback);
    }

    public removeSelectedClickHandler(callback: (container: HTMLElement) => void) {
        this.content.selectAllProducts.removeSelectedClickHandler(callback);
    }

    public changeLimitPaginationHandler(callback: (e: Event) => void) {
        this.content.cartPagination.changeLimitPaginationHandler(callback);
    }

    public changePagePaginationClickHandler(callback: (e: Event, type: string) => void) {
        this.content.cartPagination.changePagePaginationClickHandler(callback);
    }

    public changeQuntityProductInCart(callback: (e: Event, type: string) => void) {
        this.content.cartProducts.changeQuntityProductInCart(callback);
    }

    public linkClickHandler(callback: (e: Event) => void) {
        this.content.cartProducts.linkClickHandler(callback);
    }

    public inputHandlerPromoCode(callback: (e: Event) => void) {
        this.content.cartTotal.inputHandlerPromoCode(callback);
    }

    public confirmPromoCodeClickHandler(callback: () => void) {
        this.content.cartTotal.confirmPromoCodeClickHandler(callback);
    }

    public removePromoCodeClickHandler(callback: (e: Event) => void) {
        this.content.cartTotal.removePromoCodeClickHandler(callback);
    }
}

export default CartView;
