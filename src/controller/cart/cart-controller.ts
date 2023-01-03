import Controller from '../controller';
import Router from 'vanilla-router';
import CartView from '../../view/cart-view';
import RouterLinksController from '../router-links-controller';
import { Cart } from '../../model/cart/cart';
import SelectAllProducts from './features/select-all-products';
import RemoveSelectedProducts from './features/remove-selected-products';
import ChangeQuanityInCart from './features/change-quanity-in-cart';
import PromoCode from './features/promocode';
import MakeOrder from './features/make-order';
import CartPagination from './features/cart-pagination';

class CartController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        const cart = new Cart();

        const cartView = new CartView(cart);
        cartView.init();

        const features = [
            new RouterLinksController(this.router),
            new SelectAllProducts(),
            new RemoveSelectedProducts(cart),
            new ChangeQuanityInCart(cart),
            new PromoCode(cart),
            new MakeOrder(),
            new CartPagination(cart, this.router),
        ];

        features.forEach((item) => {
            item.init();
        });
    }
}

export default CartController;
