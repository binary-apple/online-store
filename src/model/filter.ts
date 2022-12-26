import { Store } from './store';
import { Product } from './types/product';

class Filter extends Store {
    products = [] as Array<Product>

    constructor(products: Array<Product>) {
        super();
    
        this.products = products;
    }

    byCategory(category: string) {
        this.products = this.products.filter((el) => el.category === category);
    }

    byBrand(brand: string) {
        this.products = this.products.filter((el) => el.brand === brand);
    }

    byPrice(priceFrom: number, priceTo: number) {
        this.products = this.products.filter((el) => el.price >= priceFrom && el.price <= priceTo);
    }

    byStock(stockFrom: number, stockTo: number) {
        this.products = this.products.filter((el) => el.stock >= stockFrom && el.stock <= stockTo);
    }
}

export default  Filter;