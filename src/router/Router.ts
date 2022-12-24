import Router from 'vanilla-router';
import Routers from './routers';
import CartController from '../controller/cart/CartController';
import ProductsController from '../controller/products/ProductsController';
import ProductController from '../controller/product/ProductController';
import ErrorController from '../controller/error/ErrorController';
import Utils from '../utils/Utils';

const utils = new Utils();
const cartController = new CartController();
const productsController = new ProductsController();
const productController = new ProductController();
const errorController = new ErrorController();

const router = new Router({
    mode: 'history',
    page404: () => {
        errorController.init();
    },
});

router.add(Routers.PRODUCTS, () => {
    productsController.init();
});

router.add(Routers.PRODUCT, () => {
    productController.init();
});

router.add(Routers.CART, () => {
    cartController.init();
});

router.addUriListener();

function activateRouter(router: Router) {
    const pathname = utils.getPathName(window.location.href);

    router.navigateTo(pathname);
}

export default activateRouter.bind(this, router);
