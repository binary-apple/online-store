import Router from 'vanilla-router';
import Utils from '../utils/Utils';
import Routers from './routers';
import Controller from '../controller/Controller';

const utils = new Utils();
const controller = new Controller();

const pathname = utils.getPathName(window.location.href);

const router = new Router({
    mode: 'history',
    page404: () => {
        controller.init();
    },
});

router.add(Routers.MAIN, () => {
    controller.init('main');
});

router.add(Routers.PRODUCTS, () => {
    controller.init('products');
});

router.add(Routers.PRODUCT, () => {
    controller.init('product');
});

router.add(Routers.CART, () => {
    controller.init('cart');
});

router.addUriListener();

function activateRouter(router: Router) {
    router.navigateTo(pathname);
}

export default activateRouter.bind(this, router);
