import Controller from '../controller';
import Router from 'vanilla-router';
import { ErrorView } from '../../view/error-view';

class ErrorController extends Controller {
    private root: HTMLElement;
    constructor(router: Router) {
        super(router);
        this.root = document.body;
    }

    init() {
        /* eslint-disable-next-line */
        console.log('error - 404');

        new ErrorView().init(this.root);
    }
}

export default ErrorController;
