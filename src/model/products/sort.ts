import { Store } from '../store';
import { Product } from '../types/product';

class ProductSort extends Store {
    products = [] as Array<Product>;

    constructor(products: Array<Product>) {
        super();

        this.products = products;
    }

    get getProducts() {
        return this.products;
    }

    byPrice(order: string) {
        this.products.sort((a, b) => {
            const isDesc = order === 'desc' ? b.price - a.price : 0;
            const isAsc = order === 'asc' ? a.price - b.price : 0;

            return isDesc || isAsc;
        });

        this.notify();
    }

    byRating(order: string) {
        this.products.sort((a, b) => {
            const isDesc = order === 'desc' ? b.rating - a.rating : 0;
            const isAsc = order === 'asc' ? a.rating - b.rating : 0;

            return isDesc || isAsc;
        });

        this.notify();
    }

    byDiscount(order: string) {
        this.products.sort((a, b) => {
            const isDesc = order === 'desc' ? b.discountPercentage - a.discountPercentage : 0;
            const isAsc = order === 'asc' ? a.discountPercentage - b.discountPercentage : 0;

            return isDesc || isAsc;
        });

        this.notify();
    }
}

export default ProductSort;
