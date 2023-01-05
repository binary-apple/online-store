import Controller from '../controller';
import { HashRouter } from '../../router/router';
import { Cart } from '../../model/cart';

class ProductController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    async getProduct() {
        // const router = this.router as unknown as IRouter;
        // const productId = router._currentPage.params[0] as number;
        // const request = new Request();
        // const response = await request.make('GET', '/products?limit=100');
        // const currentProduct = response.products.find((el: Product) => el.id === +productId);
        // return currentProduct;
    }

    async init() {
        // const product = await this.getProduct();
        // if (product) {
        // const cart = new Cart();
        // const productView = new ProductView(product, cart);
        //     productView.init();
        //     const features = [new RouterLinksController(this.router)];
        //     features.forEach((item) => {
        //         item.init();
        //     });
        // }
    }
}

export default ProductController;
