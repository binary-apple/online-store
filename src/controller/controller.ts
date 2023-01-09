import { HashRouter } from '../router/router';
import { IPageCartParams, IPageProductParams, IQueryParams, IPageMainParams } from '../router/types/router';
import CartController from './cart/cart-controller';
import MainController from './main/main-controller';
import ProductController from './product/product-controller';

class Controller {
    protected router = {} as HashRouter;
    protected root: HTMLElement;

    constructor(router: HashRouter) {
        this.router = router;
        this.root = document.querySelector('#app') as HTMLElement;

        if (this.root) {
            this.root.innerHTML = '';
        }
    }

    contollerInit(
        pageQuery: Partial<IPageCartParams> | Partial<IPageProductParams> | Partial<IPageMainParams>,
        queryParams: IQueryParams,
        controller: CartController | ProductController | MainController
    ) {
        const hasParams = Object.keys(pageQuery).length;

        if (hasParams) {
            let validParams;

            for (const key in pageQuery) {
                const value = (pageQuery[key] as string).replaceAll(' ', '+');
                const match = value.length === value.match(queryParams[key])?.length;

                validParams = match;
            }

            if (validParams) {
                controller.init();
            }
        } else {
            controller.init();
        }
    }
}

export default Controller;
