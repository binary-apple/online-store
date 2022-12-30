import Controller from '../controller';
import Router from 'vanilla-router';

class MainController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        /* eslint-disable-next-line */
        console.log('products');
    }
}

export default MainController;
