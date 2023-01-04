import Router from 'vanilla-router';

class Controller {
    protected router = {} as Router;
    protected root: HTMLElement;

    constructor(router: Router) {
        this.router = router;
        this.root = document.body;
        this.root.innerHTML = "";
    }
}

export default Controller;
