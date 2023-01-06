import Controller from '../controller';
import { HashRouter } from '../../router/router';
import { Cart } from '../../model/cart';
import CartLocalStorage from '../../model/cart-local-storage';
import { CartName } from '../../model/types/cart';
import ProductView from '../../view/product-view';
import Request from '../../api/request';
import { Product } from '../../model/types/product';
import { IRouter } from '../../router/types/router';

class ProductController extends Controller {
    cart: Cart;
    cartLocalStorage: CartLocalStorage;

    constructor(router: HashRouter) {
        super(router);
        this.cartLocalStorage = new CartLocalStorage(CartName.LOCAL_STORAGE_NAME);
        this.cart = new Cart(this.cartLocalStorage.get());
    }

    async getProduct() {
        const request = new Request();
        const response = await request.make('GET', '/products?limit=100');

        const productId = (this.router as unknown as IRouter)._currentPage.params[0] as number;

        if (+productId) {
            const product = response.products.find((el: Product) => el.id === +productId);

            if (product) {
                return product;
            }
        }
    }

    async init() {
        const product = await this.getProduct();

        if (product) {
            const productView = new ProductView(product, this.cart);

            productView.init();
        }
    }
}

export default ProductController;
