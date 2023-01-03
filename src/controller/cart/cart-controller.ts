import Controller from '../controller';
import Router from 'vanilla-router';
import CartView from '../../view/cart-view';
import RouterLinksController from '../router-links-controller';
import SelectAllProducts from './features/select-all-products';
import RemoveSelectedProducts from './features/remove-selected-products';
import ChangeQuanityInCart from './features/change-quantity-in-cart';
import PromoCode from './features/promocode';
import MakeOrder from './features/make-order';
import CartPagination from './features/cart-pagination';
import { Cart } from '../../model/cart/cart';
import CartLocalStorage from '../../model/cart/cart-local-storage';
import CartFacade from '../../model/cart/cart-facade';
import CartPaginationState from '../../model/cart/cart-pagination-state';
import CartQuery from '../../model/cart/cart-query';
import ConfirmController from '../confirm-controller';
import { Product } from '../../model/types/product';

class CartController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        const cartLocalStorage = new CartLocalStorage();
        const cart = new Cart(cartLocalStorage);

        const cartPagination = new CartPaginationState(cart, cartLocalStorage);

        const cartFacade = new CartFacade(
            cart,
            cartLocalStorage,
            cartPagination,
            new CartQuery(cartPagination, cartLocalStorage, this.router)
        );

        if (!cartLocalStorage.cart.products?.length) {
            cartFacade.addProduct({ id: 1 } as Product, 1);
            cartFacade.addProduct({ id: 2 } as Product, 1);
            cartFacade.addProduct({ id: 3 } as Product, 1);
            cartFacade.addProduct({ id: 4 } as Product, 1);
            cartFacade.addProduct({ id: 5 } as Product, 1);
        }

        const cartView = new CartView(cartFacade);
        cartView.init();

        const features = [
            new RouterLinksController(this.router),
            new SelectAllProducts(),
            new RemoveSelectedProducts(cartFacade),
            new ChangeQuanityInCart(cartFacade),
            new CartPagination(cartFacade),
            new PromoCode(cartFacade),
            new ConfirmController(this.router),
            new MakeOrder(),
        ];

        features.forEach((item) => {
            item.init();
        });
    }
}

export default CartController;
