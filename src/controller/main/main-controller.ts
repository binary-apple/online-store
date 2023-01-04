import Controller from '../controller';
import Router from 'vanilla-router';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import Request from '../../api/request';
import Products from '../../model/products/products';

class MainController extends Controller {
    private view: MainView;
    private cart: Cart = new Cart();
    private products: Products = new Products([]);
    constructor(router: Router) {
        super(router);
        
        const big = this.getBigFromQuery() === 'false' ? false : true;
        this.view = new MainView(this.cart, this.products, big);
    }

    async init() {
        /* eslint-disable-next-line */
        console.log('products');

        let cart = new Cart();

        // const view = new MainView(cart);
        this.view.init(this.root);

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        this.view.handleSliderInput(this.handleSliderInput.bind(this));
        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));

        this.view.handleBigScaleClick(this.handleBigScaleClick.bind(this));
        this.view.handleSmallScaleClick(this.handleSmallScaleClick.bind(this));

        const prods = new Request().make('GET', 'https://dummyjson.com/products?limit=100');
        //  TODO: catch error
        this.products.set((await prods).products);
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

    private handleBigScaleClick(e: Event) {
        this.view.setBigScale();
        this.addScaleToQuery(true);
    }
    private handleSmallScaleClick(e: Event) {
        this.view.setSmallScale();
        this.addScaleToQuery(false);
    }

    private addScaleToQuery(big: boolean) {
        const url = new URL(window.location.href);
            this.router.navigateTo(`/?big=${big}`);
    }

    private getBigFromQuery(): string | null {
        const url = new URL(window.location.href);
        const query = url.searchParams;
        return query.get('big');
    }
}

export default MainController;
