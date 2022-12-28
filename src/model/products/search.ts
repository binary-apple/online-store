import { Store } from '../store';
import { Product } from '../types/product';

class ProductsSearch extends Store {
    products = [] as Array<Product>;

    constructor(products: Array<Product>) {
        super();

        this.products = products;
    }

    get getProducts() {
        return this.products;
    }

    search(value: string) {
        const numberValue = parseInt(value, 10);
        const isNumber = !Number.isNaN(numberValue);

        if (isNumber) {
            const searchByNumber = this.searchByNumber.bind(this, numberValue);

            this.products = this.products.filter(searchByNumber);
        } else {
            const searchByString = this.searchByString.bind(this, value);

            this.products = this.products.filter(searchByString);
        }

        this.notify();
    }

    searchByNumber(numberValue: number, el: Product) {
        const isPrice = el.price === numberValue ? el : false;
        const isDiscount = el.discountPercentage === numberValue ? el : false;
        const isRating = el.rating === numberValue ? el : false;
        const isStock = el.stock === numberValue ? el : false;

        return isPrice || isDiscount || isRating || isStock;
    }

    searchByString(value: string, el: Product) {
        const isBrand = el.brand.includes(value) ? el : false;
        const isCategory = el.category.includes(value) ? el : false;
        const isDescription = el.description.includes(value) ? el : false;
        const isTitle = el.title.includes(value) ? el : false;

        return isBrand || isCategory || isDescription || isTitle;
    }
}

export default ProductsSearch;
