import { Error } from "../components/error-content";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Cart } from "../model/cart";
import { View } from "./types/view";

export class ErrorView implements View {
    private header: Header;
    private footer: Footer;
    private errorContent: Error;
    constructor(cart: Cart) {
        this.header = new Header(cart);
        this.footer = new Footer();
        this.errorContent = new Error();
    }

    init(root: HTMLElement): HTMLElement {
        root.append(this.header.render());
        root.append(this.errorContent.render());
        root.append((this.footer.render()));

        return root;
    }
}