import Controller from '../controller';
import Router from 'vanilla-router';
import { ErrorView } from '../../view/error-view';
import { Cart } from '../../model/cart';
import Routers from '../../router/routers';

class ErrorController extends Controller {
    // private root: HTMLElement;
    private cart: Cart = new Cart();
    constructor(router: Router) {
        super(router);
        this.root = document.body;
    }

    init() {
        /* eslint-disable-next-line */
        console.log('error - 404');

        const view = new ErrorView(this.cart);
        view.init(this.root);

        view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));
    }

    private handleClickToCartIcon(e: Event){
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon(e: Event){
        this.router.navigateTo(Routers.MAIN);
    }
}

export default ErrorController;
