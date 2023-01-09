import Router, { RouterOptions } from 'vanilla-router';
import Routers from './routers';
import CartController from '../controller/cart/cart-controller';
import MainController from '../controller/main/main-controller';
import ProductController from '../controller/product/product-controller';
import ErrorController from '../controller/error/error-controller';
import { IterableObject } from '../utils/types/utils';
import { IPageCartParams, IPageProductParams } from './types/router';

export class HashRouter extends Router {
    constructor(settings: RouterOptions) {
        super(settings);
    }

    addSearchParams(key: string, value: string) {
        const url = new URL(window.location.href);

        url.searchParams.set(key, value);

        history.pushState({}, '', url);
    }

    removeSearchParam(key: string) {
        const url = new URL(window.location.href);

        const params = this.getSearchParams();

        if (key in params) {
            url.searchParams.delete(key);
        }

        history.pushState({}, '', url);
    }

    clearSearchParams() {
        const url = new URL(window.location.href);

        const params = this.getSearchParams();

        for (const key in params) {
            url.searchParams.delete(key);
        }

        history.pushState({}, '', url);
    }

    getSearchParams() {
        const url = new URL(window.location.href);

        const paramsObj: IterableObject = {};

        url.searchParams.forEach((value: string, key: string) => {
            const notANumber = Number.isNaN(+value);

            const isNumber = notANumber ? false : +value;
            const isTrue = value === 'true' ? true : false;
            const isNotFalse = notANumber && value !== 'false' ? value : false;

            paramsObj[key] = isNumber || isTrue || isNotFalse || false;
        });

        return paramsObj;
    }
}

const router = new HashRouter({
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
    const queryParams = {};

    const pageQuery = router.getSearchParams() as unknown as IPageProductParams;

    const productController = new ProductController(router);

    productController.contollerInit(pageQuery, queryParams, productController);
});

router.add(Routers.CART, () => {
    const queryParams = {
        page: /[0-9]/g,
        limit: /[0-9]/g,
    };

    const pageQuery = router.getSearchParams() as unknown as IPageCartParams;

    const cartController = new CartController(router);

    cartController.contollerInit(pageQuery, queryParams, cartController);
});

router.addUriListener();

function activateRouter(router: Router) {
    router.check();
}

export default activateRouter.bind(this, router);
