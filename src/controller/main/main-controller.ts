import Controller from '../controller';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import Products from '../../model/products/products';
import { products } from '../../model/productItems';
import { HashRouter } from '../../router/router';
import CartLocalStorage from '../../model/cart-local-storage';
import { CartName } from '../../model/types/cart';
import { Router } from 'express';

class MainController extends Controller {
    private view: MainView;
    private cart: Cart;
    private products: Products = new Products([]);
    private cartLS: CartLocalStorage;
    constructor(router: HashRouter) {
        super(router);

        this.cartLS = new CartLocalStorage(CartName.LOCAL_STORAGE_NAME);
        this.cart = new Cart(new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).get());
        this.view = new MainView(this.cart, this.cartLS, this.products, this.getBigFromQuery());
    }

    async init() {
        this.view.init(this.root);

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        // TODO: implement
        // this.view.handleSliderInput(this.handleSliderInput.bind(this));
        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));

        this.view.handleScaleClick(this.handleScaleClick.bind(this));

        this.products.set(products);

        this.view.handleProductClick(this.handleProductClick.bind(this));

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));
    }

    private handleClickToCartIcon(e: Event) {
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon(e: Event) {
        this.router.navigateTo(Routers.MAIN);
    }

    private handleSliderInput(e: Event) {
        this.view.setSliderTrack();
    }

    private handleResizeWindow(e: Event) {
        this.view.setSliderTrack();
    }

    private handleScaleClick(big: boolean) {
        this.router.addSearchParams('big', String(big));
    }

    private getBigFromQuery(): boolean {
        const query = this.router.getSearchParams();
        const strBig = query.big;
        if (typeof strBig === 'string') {
            if (strBig === 'true') return true;
            if (strBig === 'false') return false;
        }
        return true;
    }

    private handleProductClick(id: number) {
        // TODO: implement via Routers
        this.router.navigateTo(`/product/${id}`);
    }
}

export default MainController;
