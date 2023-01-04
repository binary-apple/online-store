class BreadCrumbsStore {
    breadcrumbs: Array<string> = ['/'];

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
