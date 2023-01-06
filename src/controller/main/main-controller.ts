import Controller from '../controller';
import Router from 'vanilla-router';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import Products from '../../model/products/products';
import { CartAPI } from '../../model/cart-api';
import { products } from '../../model/productItems';

class MainController extends Controller {
    private view: MainView;
    private cart: Cart = new Cart();
    private products: Products = new Products([]);
    private cartAPI: CartAPI = new CartAPI();
    constructor(router: Router) {
        super(router);

        this.cart.attach(this.cartAPI);
        
        const big = this.getBigFromQuery() === 'false' ? false : true;
        this.view = new MainView(this.cart, this.products, big);
    }

    async init() {
        /* eslint-disable-next-line */
        console.log('products');
        
        this.view.init(this.root);
        
        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        this.view.handleSliderInput(this.handleSliderInput.bind(this));
        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));
        
        this.view.handleScaleClick(this.handleScaleClick.bind(this));
        
        this.products.set(products);
        
        // this.view.handleProductButtonClick();
        this.view.handleProductClick(this.handleProductClick.bind(this));
        this.cart.setCart(this.cartAPI.createFromJSON());
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

    private handleScaleClick(big: boolean) {
        // TODO: addScaleToQuery
    }

    private getBigFromQuery(): string | null {
        // TODO: use router method
        const url = new URL(window.location.href);
        const query = url.searchParams;
        return query.get('big');
    }

    private handleProductClick(id: number) {
        // TODO: implement via Routers
        this.router.navigateTo(`/product/${id}`);
    }

}

export default MainController;
