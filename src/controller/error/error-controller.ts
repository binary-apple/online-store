import Controller from '../controller';
import Router from 'vanilla-router';
import { ErrorView } from '../../view/error-view';
import { Cart } from '../../model/cart';

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
    }
}

export default ErrorController;
