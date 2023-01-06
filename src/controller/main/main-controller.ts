import Controller from '../controller';
import Router from 'vanilla-router';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import Request from '../../api/request';
import Products from '../../model/products/products';
import { CartAPI } from '../../model/cart-api';

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
        
        const prods = new Request().make('GET', 'https://dummyjson.com/products?limit=100');
        //  TODO: catch error
        this.products.set((await prods).products);
        
        this.view.handleProductButtonClick();
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
        console.log(big);
        // TODO: addScaleToQuery
    }

    private getBigFromQuery(): string | null {
        const url = new URL(window.location.href);
        const query = url.searchParams;
        return query.get('big');
    }

    // private addToDropFromCart(e: Event) {
    //     this.view.addToDropFromCart(e);
    // }

    public handleProductButtonClick() {
        this.view.handleProductButtonClick();
    }

}

export default MainController;
