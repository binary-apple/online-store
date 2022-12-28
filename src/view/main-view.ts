import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Content } from "../components/main";
import { View } from "./types/view";
import { Cart } from "../model/cart";

export class MainView implements View {
    private header: Header;
    private footer: Footer;
    private content: Content;
    constructor(cart: Cart) {
        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new Content();
    }

    init(root: HTMLElement): void {
        root.append(this.header.render())
        root.append(this.content.render())
        root.append(this.footer.render())
    }
}