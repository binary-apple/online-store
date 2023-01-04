import { View } from './types/view';
import BaseView from './base-view';
import CartContent from '../components/cart/cart-content';
import BreadCrumbs from '../components/breadcrumbs';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import CartFacade from '../model/cart/cart-facade';

class CartView extends BaseView implements View {
    private content: CartContent;
    private breadcrumbs: BreadCrumbs;
    private header: Header;
    private footer: Footer;

    constructor(cart: CartFacade) {
        super();

        this.header = new Header();
        this.footer = new Footer();
        this.breadcrumbs = new BreadCrumbs();
        this.content = new CartContent(cart);
    }

    init() {
        this.root.append(this.header.render());
        this.root.append(this.container);
        this.container.append(this.breadcrumbs.render());
        this.container.append(this.content.render());
        this.root.append(this.footer.render());
    }
}

export default CartView;
