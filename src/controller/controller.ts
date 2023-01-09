import { HashRouter } from '../router/router';
import { IPageCartParams, IPageProductParams, IQueryParams } from '../router/types/router';
import CartController from './cart/cart-controller';
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
        pageQuery: IPageCartParams | IPageProductParams,
        queryParams: IQueryParams,
        controller: CartController | ProductController
    ) {
        const hasParams = Object.keys(pageQuery).length;

        if (hasParams) {
            let validParams;

            for (const key in pageQuery) {
                validParams = ('' + pageQuery[key]).match(queryParams[key])?.length === ('' + pageQuery[key]).length;
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
