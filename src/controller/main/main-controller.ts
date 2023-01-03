import Controller from '../controller';
import Router from 'vanilla-router';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';

class MainController extends Controller {
    view = new MainView(new Cart());
    constructor(router: Router) {
        super(router);
        console.log(this.view);
    }

    async init() {
        /* eslint-disable-next-line */
        console.log('products');

        let cart = new Cart();

        const view = new MainView(cart);
        view.init(this.root);

        view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        view.handleSliderInput(this.handleSliderInput.bind(this));
        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));

    }

    private handleClickToCartIcon(e: Event){
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon(e: Event){
        this.router.navigateTo(Routers.MAIN);
    }

    private handleSliderInput(e: Event) {
        this.view.setSliderTrack();
    }

    private handleResizeWindow(e: Event) {
        this.view.setSliderTrack();
    }
}

export default MainController;
