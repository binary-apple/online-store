import Controller from '../controller';
import { HashRouter } from '../../router/router';
import { Cart } from '../../model/cart';
import CartLocalStorage from '../../model/cart-local-storage';
import { CartName } from '../../model/types/cart';
import ProductView from '../../view/product-view';
import { Product } from '../../model/types/product';
import { IRouter } from '../../router/types/router';
import { products } from '../../model/productItems';
import Routers from '../../router/routers';

class ProductController extends Controller {
    cart: Cart;
    cartLocalStorage: CartLocalStorage;
    products: Array<Product>;

    constructor(router: HashRouter) {
        super(router);
        this.cartLocalStorage = new CartLocalStorage(CartName.LOCAL_STORAGE_NAME);
        this.cart = new Cart(this.cartLocalStorage.get(), this.cartLocalStorage.getPromocodes());
        this.products = products;
    }

    async getProduct() {
        const productId = (this.router as unknown as IRouter)._currentPage.params[0] as number;

        if (+productId) {
            const product = this.products.find((el: Product) => el.id === +productId);

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

            productView.addProdcutToCard((product: Product, type: string) => {
                if (type === 'add') {
                    this.cart.addProductToCart(product);
                } else {
                    this.cart.removeProductFromCart(product.id);
                }

                this.cartLocalStorage.set(this.cart.get());
            });

            productView.makeOrder((product: Product) => {
                const inCart = this.cart.productInCart(product);

                if (!inCart) {
                    this.cart.addProductToCart(product);
                    this.cartLocalStorage.set(this.cart.get());
                }

                const productState = {
                    isRedirect: true,
                    product: product,
                };

                this.router.navigateTo('/cart', JSON.stringify(productState));
            });

            productView.handleClickToBreadcrumb(() => {
                this.router.navigateTo(Routers.MAIN);
            })

            productView.handleClickToCartIcon(() => {
                this.router.navigateTo(Routers.CART);
            })
    
            productView.handleClickToLogoIcon(() => {
                this.router.navigateTo(Routers.MAIN);
            })
        } else {
            this.router.navigateTo('/404', '');
        }
    }
}

export default ProductController;
