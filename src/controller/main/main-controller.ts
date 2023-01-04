import Controller from '../controller';
import Router from 'vanilla-router';
import { MainView } from '../../view/main-view';
import RouterLinksController from '../router-links-controller';

class MainController extends Controller {
    constructor(router: Router) {
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
