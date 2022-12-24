import Router from 'vanilla-router';
import Routers from './routers';
import CartController from '../controller/cart/CartController';
import ProductsController from '../controller/products/ProductsController';
import ProductController from '../controller/product/ProductController';
import ErrorController from '../controller/error/ErrorController';
import Utils from '../utils/Utils';

const utils = new Utils();

const router = new Router({
    mode: 'history',
    page404: () => {
        const errorController = new ErrorController(router);

        errorController.init();
    },
});

router.add(Routers.PRODUCTS, () => {
    const productsController = new ProductsController(router);

    productsController.init();
});

router.add(Routers.PRODUCT, () => {
    const productController = new ProductController(router);

    productController.init();
});

router.add(Routers.CART, () => {
    const cartController = new CartController(router);

    cartController.init();
});

router.addUriListener();

function activateRouter(router: Router) {
    const pathname = utils.getPathName(window.location.href);

    router.navigateTo(pathname);
}

export default activateRouter.bind(this, router);
