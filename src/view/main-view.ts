import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Content } from '../components/main';
import { View } from './types/view';
import { Cart } from '../model/cart';
import BaseView from './base-view';

export class MainView extends BaseView implements View {
    private header: Header;
    private footer: Footer;
    private content: Content;

    constructor(cart: Cart) {
        super();

        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new Content();
    }

    init(root: HTMLElement): void {
        root.append(this.header.render());
        this.container.append(this.content.render());
        root.append(this.container);
        root.append(this.footer.render());
    }

    public handleClickToCartIcon(callback: (e: Event) => void) {
        this.header.handleClickToCartIcon(callback);
    }

    public handleClickToLogoIcon(callback: (e: Event) => void) {
        this.header.handleClickToLogoIcon(callback);
    }
}
