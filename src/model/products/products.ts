import { IFilter, FilterMetric } from '../types/filter';
import { Product } from '../types/product';
import { Store } from '../store';
// import { number } from 'yargs';

export class Products extends Store {
    initialItems: Array<Product>;
    filtred: Array<Product>;
    filterItem: IFilter;

    constructor(items: Array<Product>) {
        super();
        this.filtred = items;
        this.initialItems = items;

        this.filter = this.filter;
        this.filterItem = {} as IFilter;
    }

    public set(items: Array<Product>) {
        this.filtred = items;
        this.initialItems = items;
        this.notify();
    }

    public get() {
        return this.filtred;
    }

    private _getRange(rangeName: 'price' | 'stock', sourceArray: Array<Product>): {min: number, max: number} {
        const targetArray = sourceArray.map((el) => el[rangeName])
        return { min: Math.min(...targetArray), max: Math.max(...targetArray)};
    }

    public getTotalRange(rangeName: 'price' | 'stock') {
        return this._getRange(rangeName, this.initialItems);
    }

    public getFilteredRange(rangeName: 'price' | 'stock') {
        return this._getRange(rangeName, this.filtred);
    }

    public getMetrics() {
        const cats = [...new Set(this.initialItems.map((item) => item.category.toLowerCase().trim()))];
        const brs = [...new Set(this.initialItems.map((item) => item.brand.toLowerCase().trim()))];

        const categories: FilterMetric = {};

        const brands: FilterMetric = {};

        cats.forEach((item) => {
            categories[item] = {
                available: this.filtred.filter((el) => el.category.toLowerCase().trim() === item.toLowerCase().trim())
                    .length,
                total: this.initialItems.filter((el) => el.category.toLowerCase().trim() === item.toLowerCase().trim())
                    .length,
            };
        });

        brs.forEach((item) => {
            brands[item] = {
                available: this.filtred.filter((el) => el.brand.toLowerCase().trim() === item.toLowerCase().trim())
                    .length,
                total: this.initialItems.filter((el) => el.brand.toLowerCase().trim() === item.toLowerCase().trim())
                    .length,
            };
        });

        return {
            categories,
            brands,
        };
    }

    public filter(filter: IFilter) {
        this.filterItem = filter;
        const sortItems = this.sortItems.bind(this, filter);

        this.initializeFilter(filter);

        const isSubstring = (str: string, substr: string) => {
            return str.toLowerCase().includes(substr.trim().toLowerCase());
        }

        this.filtred = this.initialItems
            .filter((el) => {
                if (filter.search) {
                    if (!isSubstring(el.brand, filter.search) &&
                        !isSubstring(el.category, filter.search) &&
                        !isSubstring(String(el.price), filter.search) &&
                        !isSubstring(String(el.stock), filter.search) &&
                        !isSubstring(String(el.rating), filter.search) &&
                        !isSubstring(String(el.discountPercentage), filter.search) &&
                        !isSubstring(el.description, filter.search) &&
                        !isSubstring(el.title, filter.search) &&
                        !isSubstring(el.title, filter.search)) {
                        return false;
                    }
                }
                if (filter.brands.length > 0 && !filter.brands.includes(el.brand.trim().toLowerCase())) {
                    return false;
                }
                if (filter.categories.length > 0 && !filter.categories.includes(el.category.toLowerCase())) {
                    return false;
                }
                if (filter.price.from && filter.price.to 
                    && (el.price < filter.price.from || el.price > filter.price.to)) {
                    return false;
                }
                if (filter.stock.from && filter.stock.to 
                    && (el.stock < filter.stock.from || el.stock > filter.stock.to)) {
                    return false;
                }
                return true;
            })
            .sort(sortItems);

            this.notify();
    }

    private sortItems(filter: IFilter, a: Product, b: Product) {
        let { value, order } = filter.sort;

        if (!value || !order) {
            value = 'id';
            order = 'asc';
        }

        let sorting;

        if (order === 'desc') {
            sorting = +b[value]! - +a[value]!;
        } else {
            sorting = +a[value]! - +b[value]!;
        }

        return sorting;
    }

    private emptyCheck(filter: IFilter) {
        const isEmpty = !filter.search && !filter.categories && !filter.brands 
            && !filter.price.from && !filter.price.to && !filter.stock.from && !filter.stock.to;

        return isEmpty;
    }

    private initializeFilter(filter: IFilter) {
        filter.categories = filter.categories.map((item) => item.toLowerCase().trim());
        filter.brands = filter.brands.map((item) => item.toLowerCase().trim());
        filter.search = filter.search.toLowerCase();
    }
}

// export default Products;
