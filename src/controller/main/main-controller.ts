import Controller from '../controller';
import Router from 'vanilla-router';
import Request from '../../api/request';

const request = new Request();

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
