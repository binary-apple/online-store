import Controller from '../controller';
import Router from 'vanilla-router';

class ProductController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        /* eslint-disable-next-line */
        console.log('product');
    }
}

export default ProductController;
