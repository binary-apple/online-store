import Router from 'vanilla-router';

class Controller {
    protected router = {} as Router;

    constructor(router: Router) {
        this.router = router;
    }
}

export default Controller;
