import { Store } from './store';

class BreadCrumbsStore extends Store {
    breadcrumbs: Array<string> = ['/'];

    constructor() {
        super();
    }

    get() {
        return this.breadcrumbs;
    }

    set() {
        const url = new URL(window.location.href);

        const path = url.pathname.split('/').slice(1);

        this.breadcrumbs.push(...path);
    }
}

export default BreadCrumbsStore;
