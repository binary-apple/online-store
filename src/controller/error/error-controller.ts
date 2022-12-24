import Controller from '../controller';
import Router from 'vanilla-router';

class ErrorController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        /* eslint-disable-next-line */
        console.log('error - 404');
    }
}

export default ErrorController;
