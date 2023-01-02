import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { View } from "./types/view";
import { Cart } from "../model/cart";
import { Slider } from "../components/products/slider";


export class MainView implements View {
    private header: Header;
    private footer: Footer;
    private content: Slider;
    constructor(cart: Cart) {
        this.header = new Header(cart);
        this.footer = new Footer();
        this.content = new Slider();
    }

    init(root: HTMLElement) {
        root.append(this.header.render());
        root.append(this.content.render());
        root.append(this.footer.render());
        this.content.handleSliderInput(this.content.setSliderTrack.bind(this.content));
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
}