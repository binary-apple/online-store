import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { View } from "./types/view";
import { Cart } from "../model/cart";
import { MainProducts } from "../components/products/main";
import { Products as ProductsModel } from "../model/products/products";

export class MainView implements View {
    private header: Header;
    private footer: Footer;
    private content: MainProducts;

    constructor(cart: Cart, productsModel: ProductsModel, private big: boolean = true) {
        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new MainProducts(big, productsModel, cart);
    }

    init(root: HTMLElement) {
        root.append(this.header.render());
        root.append(this.content.render());
        root.append(this.footer.render());
    }

    public handleSliderInput(callback: (e: Event)=>void){
        this.content.handleSliderInput(callback);
    }

    public handleClickToCartIcon(callback: (e: Event)=>void){
        this.header.handleClickToCartIcon(callback);
    }

    public handleClickToLogoIcon(callback: (e: Event)=>void){
        this.header.handleClickToLogoIcon(callback);
    }

    public setSliderTrack() {
        this.content.setSliderTrack();
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