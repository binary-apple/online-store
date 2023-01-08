import Controller from '../controller';
import Routers from '../../router/routers';
import { Cart } from '../../model/cart';
import { MainView } from '../../view/main-view';
import Products from '../../model/products/products';
import { products } from '../../model/productItems';
import { HashRouter } from '../../router/router';
import CartLocalStorage from '../../model/cart-local-storage';
import { CartName } from '../../model/types/cart';
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
        this.cart = new Cart(
            new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).get(),
            new CartLocalStorage(CartName.LOCAL_STORAGE_NAME).getPromocodes()
        );
        this.view = new MainView(this.cart, this.cartLS, this.products, this.filter, this.getBigFromQuery());
    }

    async init() {
        this.view.init(this.root);

        this.filter.setFilter(this.getFilterFromQuery());
        this.products.filter(this.filter.get());
        this.products.notify();

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        this.view.handleResizeWindow(this.handleResizeWindow.bind(this));

        this.view.handleScaleClick(this.handleScaleClick.bind(this));

        this.view.handleProductClick(this.handleProductClick.bind(this));

        this.view.handleClickToCartIcon(this.handleClickToCartIcon.bind(this));
        this.view.handleClickToLogoIcon(this.handleClickToLogoIcon.bind(this));

        this.view.handleCopyLinkClick(this.handleCopyLinkClick.bind(this));
        this.view.handleResetFiltersClick(this.handleResetFiltersClick.bind(this));

        this.view.handleSearchInput(this.handleSearchInput.bind(this));
        this.view.handleSortInput(this.handleSortInput.bind(this));
    }

    private handleClickToCartIcon() {
        this.router.navigateTo(Routers.CART);
    }

    private handleClickToLogoIcon() {
        this.router.navigateTo(Routers.MAIN);
    }

    private handleSliderInput() {
        this.view.setSliderTrack();
    }

    private handleResizeWindow() {
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

    private getFilterFromQuery(): Partial<IFilter> {
        const query = this.router.getSearchParams();
        const filter: Partial<IFilter> = {};
        if ('search' in query) {
            filter.search = String(query['search']);
        }
        if ('sort' in query) {
            const valueArr = String(query['sort']).toLowerCase().split('-');
            filter.sort = { order: valueArr[1], value: valueArr[0] };
        }
        // TODO: set other components according query

        return filter;
    }

    private handleSearchInput(value: string) {
        if (value.length === 0) {
            this.router.removeSearchParam('search');
        }
        if (value.length > 0) {
            this.router.addSearchParams('search', value);
        }
        this.filter.setFilter({ search: value });
        this.products.filter(this.filter.get());
    }

    private handleSortInput(value: string) {
        const valueArr = value.toLowerCase().split('-');
        if (valueArr[1].toLowerCase() === 'title') {
            this.router.removeSearchParam('sort');
            this.filter.setFilter({ sort: { order: '', value: '' } });
            this.products.filter(this.filter.get());
        } else {
            this.router.addSearchParams('sort', value.toLowerCase());
            this.filter.setFilter({ sort: { order: valueArr[1], value: valueArr[0] } });
            this.products.filter(this.filter.get());
        }
    }
}

export default MainController;
