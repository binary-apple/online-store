import { HashRouter } from '../router/router';

class Controller {
    protected router = {} as HashRouter;

    constructor(router: HashRouter) {
        this.router = router;
    }
}

export default Controller;
