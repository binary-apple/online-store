import Controller from '../Controller';
import Router from 'vanilla-router';

class CartController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        /* eslint-disable-next-line */
        console.log('cart');
    }
}

export default CartController;
