import { HashRouter } from '../../router/router';
import Controller from '../controller';

class ErrorController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    init() {
        /* eslint-disable-next-line */
        console.log('error - 404');
    }
}

export default ErrorController;
