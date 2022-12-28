import { Store } from '../store';
import { Product } from '../types/product';

class Filter extends Store {
    products = [] as Array<Product>;
    inititalProducts = [] as Array<Product>;

    constructor(products: Array<Product>) {
        super();

        this.products = products;
        this.inititalProducts = products;
    }

    get getProducts() {
        return this.products;
    }

    byCategory(category: string) {
        this.products = this.products.filter((el) => el.category === category);
        this.notify();
    }

    byBrand(brand: string) {
        this.products = this.products.filter((el) => el.brand === brand);
        this.notify();
    }

    byPrice(priceFrom: number, priceTo: number) {
        this.products = this.products.filter((el) => el.price >= priceFrom && el.price <= priceTo);
        this.notify();
    }

    byStock(stockFrom: number, stockTo: number) {
        this.products = this.products.filter((el) => el.stock >= stockFrom && el.stock <= stockTo);
        this.notify();
    }

    reset() {
        this.products = this.inititalProducts;
        this.notify();
    }
}

export default Filter;
