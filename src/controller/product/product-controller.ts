import Controller from '../controller';
import Router from 'vanilla-router';
import { IRouter } from '../../router/types/router';
import Request from '../../api/request';
import { Product } from '../../model/types/product';
import ProductView from '../../view/product-view';
import RouterLinksController from '../router-links-controller';

class ProductController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    async getProduct() {
        const router = this.router as unknown as IRouter;

        const productId = router._currentPage.params[0] as number;

        const request = new Request();

        const response = await request.make('GET', '/products?limit=100');

        const currentProduct = response.products.find((el: Product) => el.id === +productId);

        return currentProduct;
    }

    async init() {
        const product = await this.getProduct();

        if (product) {
            const productView = new ProductView(product);
            productView.init();

            const features = [new RouterLinksController(this.router)];

            features.forEach((item) => {
                item.init();
            });
        }
    }
}

export default ProductController;
