import { HashRouter } from '../../router/router';
import Controller from '../controller';
import { ErrorView } from '../../view/error-view';
import { Cart } from '../../model/cart';
import Routers from '../../router/routers';
// import { CartAPI } from '../../model/cart-api';
import CartLocalStorage from '../../model/cart-local-storage';
import { CartName } from '../../model/types/cart';

class ErrorController extends Controller {
    // private root: HTMLElement;
    private cart: Cart = new Cart(
        new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).get(),
        new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).getPromocodes()
    );
    constructor(router: HashRouter) {
        super(router);
        // this.root = document.body;
        // this.cart.attach(this.cartAPI);
        // TODO: attach cart to localStorage
    }

    init() {
        const view = new ErrorView(this.cart);
        view.init(this.root);

        view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));
    }

    private handleClickToCartIcon() {
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon() {
        this.router.navigateTo(Routers.MAIN);
    }
}

export default ErrorController;
