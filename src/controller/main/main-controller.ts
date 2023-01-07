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
import Filter from '../../model/products/filter';
import { IFilter } from '../../model/types/filter';

class MainController extends Controller {
    private view: MainView;
    private cart: Cart;
    private products: Products = new Products([]);
    private filter: Filter = new Filter({});

    private cartLS: CartLocalStorage;
    constructor(router: HashRouter) {
        super(router);
        
        this.products.set(products);
        
        this.cartLS = new CartLocalStorage(CartName.LOCAL_STORAGE_NAME);        
        this.cart = new Cart(new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).get());
        this.view = new MainView(this.cart, this.cartLS, this.products, this.filter, this.getBigFromQuery());

    }
    
    async init() {
        /* eslint-disable-next-line */
        console.log('products');
        
        this.view.init(this.root);
        
        this.products.notify();

        // TODO: get filter from query
        // this.filter.setFilter(this.products.);
        
        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        // TODO: implement
        // this.view.handleSliderInput(this.handleSliderInput.bind(this));
        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));
        
        this.view.handleScaleClick(this.handleScaleClick.bind(this));
        
        
        this.view.handleProductClick(this.handleProductClick.bind(this));

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        this.view.handleCopyLinkClick(this.handleCopyLinkClick.bind(this));
        this.view.handleResetFiltersClick(this.handleResetFiltersClick.bind(this));        

        this.view.handleSearchInput(this.handleSearchInput.bind(this));
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
        return !!query.big;
    }

    private handleProductClick(id: number) {
        // TODO: implement via Routers
        this.router.navigateTo(`/product/${id}`);
    }

    private handleCopyLinkClick() {
        navigator.clipboard.writeText(document.location.href);
    }

    private handleResetFiltersClick() {
        this.router.navigateTo(Routers.MAIN);
    }

    private handleSearchInput(value: string) {
        if (value.length === 0) {
            this.router.removeSearchParam('search');
        }
        if (value.length > 0) {
            this.router.addSearchParams('search', value);
        }
        // todo set current filter
        // this.filter.setFilter({search: value});
        // console.log(this.filter);
        // this.products.filter(this.filter.get());
    }

    /* private getFilterFromQuery(): Partial<IFilter> {
        const filter = {};
        const query = this.router.getSearchParams();
        let curParam = query.sort;
        if (curParam && typeof curParam === 'string') {


        }

        return filter;
    } */

}

export default MainController;
