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
import ConfirmController from '../confirm-controller';

class CartController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        const cart = new Cart(this.router);

        const cartView = new CartView(cart);
        cartView.init();

        const routerController = new RouterLinksController(this.router);
        const selectAllController = new SelectAllProducts();
        const removeSelected = new RemoveSelectedProducts(cart);
        const changeQuanity = new ChangeQuanityInCart(cart);
        const promoCode = new PromoCode(cart);
        const makeOrder = new MakeOrder();
        const cartPagination = new CartPagination(cart, this.router);
        const confirmController = new ConfirmController(this.router, promoCode.applyPromo.bind(cart));

        const features = [
            routerController,
            selectAllController,
            removeSelected,
            changeQuanity,
            promoCode,
            makeOrder,
            cartPagination,
            confirmController,
        ];

        features.forEach((item) => {
            item.init();
        });
    }
}

export default CartController;
