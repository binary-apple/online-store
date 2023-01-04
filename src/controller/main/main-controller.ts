import Controller from '../controller';
import { MainView } from '../../view/main-view';
import RouterLinksController from '../router-links-controller';
import { HashRouter } from '../../router/router';

class MainController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    async init() {
        const mainView = new MainView();
        mainView.init();

        const links = new RouterLinksController(this.router);
        links.init();
    }
}

export default MainController;
