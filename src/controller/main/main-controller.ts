import Controller from '../controller';
import Router from 'vanilla-router';

class MainController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    async init() {
        /* eslint-disable-next-line */
        console.log('products');
    }
}

export default MainController;
