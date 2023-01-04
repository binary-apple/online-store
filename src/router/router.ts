import Router from 'vanilla-router';
import Routers from './routers';
import CartController from '../controller/cart/cart-controller';
import MainController from '../controller/main/main-controller';
import ProductController from '../controller/product/product-controller';
import ErrorController from '../controller/error/error-controller';

const router = new Router({
    mode: 'history',
    page404: () => {
        const errorController = new ErrorController(router);

        errorController.init();
    },
});

router.add(Routers.MAIN, () => {
    const mainController = new MainController(router);

    mainController.init();
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
    router.check();
}

export default activateRouter.bind(this, router);
