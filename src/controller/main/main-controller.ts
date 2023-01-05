import Controller from '../controller';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import { HashRouter } from '../../router/router';

class MainController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    async init() {
        /* eslint-disable-next-line */
        console.log('products');

        const cart = new Cart();

        const view = new MainView(cart);
        view.init(this.root);

        view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));
    }

    private handleClickToCartIcon(e: Event) {
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon(e: Event) {
        this.router.navigateTo(Routers.MAIN);
    }
}

export default MainController;
