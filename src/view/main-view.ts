import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Content } from '../components/main';
import { View } from './types/view';
import BaseView from './base-view';

export class MainView extends BaseView implements View {
    private header: Header;
    private footer: Footer;
    private content: Content;

    constructor() {
        super();

        this.header = new Header();
        this.footer = new Footer();
        this.content = new Content();
    }

    init(): void {
        this.root.append(this.header.render());
        this.container.append(this.content.render());
        this.root.append(this.container);
        this.root.append(this.footer.render());
    }
}
