import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { View } from "./types/view";
import { Cart } from "../model/cart";
import { Slider } from "../components/products/slider";
import { MainProducts } from "../components/products/main";

export class MainView implements View {
    private header: Header;
    private footer: Footer;
    private content: MainProducts;
    constructor(cart: Cart) {
        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new MainProducts();
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

    public handleViewIconClick(callback: (e:Event) => void) {
        this.content.handleViewIconClick(callback);
    }

    public toggleView(e: Event) {
        this.content.toggeView(e);
    }
}