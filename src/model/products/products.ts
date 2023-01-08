import { IFilter, FilterMetric } from '../types/filter';
import { Product } from '../types/product';
import { Store } from '../store';

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
        const isEmpty = this.emptyCheck(filter);
        const sortItems = this.sortItems.bind(this, filter);

        if (isEmpty) {
            this.filtred = this.initialItems
                .filter((el) => {
                    return (
                        filter.price.to >= el.price &&
                        filter.price.from <= el.price &&
                        filter.stock.from <= el.stock &&
                        filter.stock.to >= el.stock
                    );
                })
                .sort(sortItems);
            this.notify();
            return;
        }

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
                // TODO: check all other filters
                return true;

                // const category = el.category.toLowerCase().trim();
                // const brand = el.brand.toLowerCase().trim();

                // const searchOnly = filter.search && !filter.categories.length && !filter.brands.length;

                // const categoriesOnly = !filter.search && filter.categories.length && !filter.brands.length;

                // const brandsOnly = !filter.search && !filter.categories.length && filter.brands.length;
                // const searchCategories = filter.categories.includes(category);
                // const searchBrands = filter.brands.includes(brand);

                // const searchPrice = this.searchByPrice(filter, el);
                // const searchStock = this.searchByStock(filter, el);

                // const search = this.searchItems(el, filter.search);

                // const searchAndCategories = filter.search && filter.categories.length && !filter.brands.length;
                // const searchBySearchAndCategories = this.bySearchAndCategories(filter, el);
                // const seachByAll = filter.search && filter.categories.length && filter.brands.length;
                // const searchByAllParams = this.byAllParams(filter, el);
                // const searchAndBrand = filter.search && !filter.categories.length && filter.brands.length;
                // const searchAndBrandFilter = this.searchAndBrand(filter, el);
                // const categoriesAndBrands = !filter.search && filter.categories.length && filter.brands.length;
                // const categoriesAndBrandsFilter = this.categoriesAndBrandsFilter(filter, el);

                // return searchOnly
                //     ? search && searchPrice && searchStock
                //     : categoriesOnly
                //     ? searchCategories && searchPrice && searchStock
                //     : brandsOnly
                //     ? searchBrands && searchPrice && searchStock
                //     : searchAndCategories
                //     ? searchBySearchAndCategories && searchPrice && searchStock
                //     : seachByAll
                //     ? searchByAllParams && searchPrice && searchStock
                //     : searchAndBrand
                //     ? searchAndBrandFilter && searchPrice && searchStock
                //     : categoriesAndBrands
                //     ? categoriesAndBrandsFilter && searchPrice && searchStock
                //     : null;
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

    private categoriesAndBrandsFilter(filter: IFilter, el: Product) {
        const category = el.category.toLowerCase().trim();
        const brand = el.brand.toLowerCase().trim();

        return filter.categories.includes(category) && filter.brands.includes(brand);
    }

    private searchAndBrand(filter: IFilter, el: Product) {
        const brand = el.brand.toLowerCase().trim();

        return this.searchItems(el, filter.search) && filter.brands.includes(brand);
    }

    private byAllParams(filter: IFilter, el: Product) {
        const category = el.category.toLowerCase().trim();
        const brand = el.brand.toLowerCase().trim();

        return (
            this.searchItems(el, filter.search) && filter.categories.includes(category) && filter.brands.includes(brand)
        );
    }

    private bySearchAndCategories(filter: IFilter, el: Product) {
        const title = el.title.toLowerCase().trim();
        const category = el.category.toLowerCase().trim();

        return this.searchItems(el, filter.search) && filter.categories.includes(category);
    }

    private emptyCheck(filter: IFilter) {
        const isEmpty = !filter.search && !filter.categories && !filter.brands;

        return isEmpty;
    }

    private initializeFilter(filter: IFilter) {
        filter.categories = filter.categories.map((item) => item.toLowerCase().trim());
        filter.brands = filter.brands.map((item) => item.toLowerCase().trim());
        filter.search = filter.search.toLowerCase();
    }

    private searchByPrice(filter: IFilter, el: Product) {
        return filter.price.to >= el.price && filter.price.from <= el.price;
    }

    private searchByStock(filter: IFilter, el: Product) {
        return filter.stock.to >= el.stock && filter.stock.from <= el.stock;
    }

    private searchItems(el: Product, value: string) {
        if (!value) {
            return;
        }

        const title = el.title.toLowerCase().trim();
        const category = el.title.toLowerCase().trim();
        const description = el.description.toLowerCase().trim();
        const brand = el.brand.toLocaleLowerCase().trim();

        return title.includes(value)
            ? el
            : category.includes(value)
            ? el
            : description.includes(value)
            ? el
            : brand.includes(value);
    }
}

export default Products;
