import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { View } from "./types/view";
import { Cart } from "../model/cart";
import { MainProducts } from "../components/products/main";
import { Products as ProductsModel } from "../model/products/products";
// import { Content } from '../components/main';
import BaseView from './base-view';
import CartLocalStorage from "../model/cart-local-storage";

export class MainView extends BaseView implements View {
    private header: Header;
    private footer: Footer;
    private content: MainProducts;

    constructor(cart: Cart, cartLS: CartLocalStorage, productsModel: ProductsModel, private big: boolean = true) {
        super();
        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new MainProducts(big, productsModel, cart, cartLS);
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

    public setSliderTrack() {
        // this.content.setSliderTrack();
    }

    public handleResizeWindow(callback: (e: Event)=> void) {
        window.addEventListener('resize', callback, false);
    }

    public handleScaleClick(callback: (big: boolean) => void) {
        this.content.handleScaleClick(callback);
    }

    public handleProductClick(callback: (id: number) => void) {
        this.content.handleProductClick(callback);
    }

}