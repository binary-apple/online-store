import { Product } from './types/product';

class BreadCrumbsStore {
    breadcrumbs: Array<string> = ['/'];

    get() {
        return this.breadcrumbs;
    }

    set(product?: Product) {
        const url = new URL(window.location.href);

        const path = url.pathname.split('/').slice(1);

        if (!product) {
            this.breadcrumbs.push(...path);
        } else {
            path.splice(0, 2);

            path.push(product.category.toLowerCase().trim());
            path.push(product.brand.toLowerCase().trim());
            path.push(product.title.toLowerCase().trim());

            this.breadcrumbs.push(...path);
        }
    }
}

export default BreadCrumbsStore;
