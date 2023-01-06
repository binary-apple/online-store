import { Product } from '../model/types/product';
import { IterableObject } from './types/utils';

class Utils {
    replaceItem(item: HTMLElement) {
        const clone = item.cloneNode(true);

        const parent = item.parentNode;
        const nextElement = item.nextElementSibling;

        if (parent && nextElement) {
            parent.insertBefore(clone, nextElement);
        } else if (parent && !nextElement) {
            parent.append(clone);
        }

        item.remove();

        return clone;
    }

    getPathName(url: string = window.location.href) {
        const currentUrl = new URL(url);

        return (currentUrl.pathname + currentUrl.search);
    }

    getSearchString(url: string = window.location.href) {
        const currentUrl = new URL(url);

        return currentUrl.search;
    }

    queryToObject(search: string) {
        const searchArr = search.split('?')[search.split('?').length - 1].split('&');

        const paramsObj: IterableObject = {};

        if (searchArr.length) {
            searchArr.forEach((item) => {
                const [key, value] = item.split('=');

                paramsObj[key] = +value;
            });
        }

        return paramsObj;
    }

    createProduct(product: Product, count = 1, products: Array<Product>) {
        const productItem = {
            ...product,
            count,
            order: (products?.length || 0) + 1,
        };

        return productItem;
    }
}

export default Utils;
