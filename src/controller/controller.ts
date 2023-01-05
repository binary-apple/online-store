import { HashRouter } from '../router/router';

class Controller {
    protected router = {} as HashRouter;
    protected root: HTMLElement;

    constructor(router: HashRouter) {
        this.router = router;
        this.root = document.querySelector('#app') as HTMLElement;

        if (this.root) {
            this.root.innerHTML = '';
        }
    }
}

export default Controller;
