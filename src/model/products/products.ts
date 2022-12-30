import { IFilter } from '../types/filter';
import { Product } from '../types/product';
import { Store } from '../store';

class CollectionProducts extends Store {
    filtred: Array<Product>;
    initialItems: Array<Product>;

    constructor(items: Array<Product>) {
        super();
        this.filtred = items;
        this.initialItems = items;

        this.filter = this.filter;
    }

    get() {
        return this.filtred;
    }

    filter(filter: IFilter) {
        const isEmpty = this.emptyCheck(filter);
        const sortItems = this.sortItems.bind(this, filter);

        if (isEmpty) {
            this.filtred = this.initialItems.sort(sortItems);

            this.notify();

            return;
        }

        this.initializeFilter(filter);

        this.filtred = this.initialItems
            .filter((el) => {
                const category = el.category.toLowerCase().trim();
                const brand = el.brand.toLowerCase().trim();

                const searchOnly = filter.search && !filter.categories.length && !filter.brands.length;

                const categoriesOnly = !filter.search && filter.categories.length && !filter.brands.length;

                const brandsOnly = !filter.search && !filter.categories.length && filter.brands.length;
                const searchCategories = filter.categories.includes(category);
                const searchBrands = filter.brands.includes(brand);

                const searchPrice = this.searchByPrice(filter, el);
                const searchStock = this.searchByStock(filter, el);

                const search = this.searchItems(el, filter.search);

                const searchAndCategories = filter.search && filter.categories.length && !filter.brands.length;
                const searchBySearchAndCategories = this.bySearchAndCategories(filter, el);
                const seachByAll = filter.search && filter.categories.length && filter.brands.length;
                const searchByAllParams = this.byAllParams(filter, el);
                const searchAndBrand = filter.search && !filter.categories.length && filter.brands.length;
                const searchAndBrandFilter = this.searchAndBrand(filter, el);
                const categoriesAndBrands = !filter.search && filter.categories.length && filter.brands.length;
                const categoriesAndBrandsFilter = this.categoriesAndBrandsFilter(filter, el);

                return searchOnly
                    ? search && searchPrice && searchStock
                    : categoriesOnly
                    ? searchCategories && searchPrice && searchStock
                    : brandsOnly
                    ? searchBrands && searchPrice && searchStock
                    : searchAndCategories
                    ? searchBySearchAndCategories
                    : seachByAll
                    ? searchByAllParams
                    : searchAndBrand
                    ? searchAndBrandFilter
                    : categoriesAndBrands
                    ? categoriesAndBrandsFilter
                    : null;
            })
            .sort(sortItems);

        this.notify();
    }

    sortItems(filter: IFilter, a: Product, b: Product) {
        const { value, order } = filter.sort;

        let sorting;

        if (order === 'desc') {
            sorting = +b[value] - +a[value];
        } else {
            sorting = +a[value] - +b[value];
        }

        return sorting;
    }

    categoriesAndBrandsFilter(filter: IFilter, el: Product) {
        const category = el.category.toLowerCase().trim();
        const brand = el.brand.toLowerCase().trim();

        return filter.categories.includes(category) && filter.brands.includes(brand);
    }

    searchAndBrand(filter: IFilter, el: Product) {
        const brand = el.brand.toLowerCase().trim();

        return this.searchItems(el, filter.search) && filter.brands.includes(brand);
    }

    byAllParams(filter: IFilter, el: Product) {
        const category = el.category.toLowerCase().trim();
        const brand = el.brand.toLowerCase().trim();

        return (
            this.searchItems(el, filter.search) && filter.categories.includes(category) && filter.brands.includes(brand)
        );
    }

    bySearchAndCategories(filter: IFilter, el: Product) {
        const title = el.title.toLowerCase().trim();
        const category = el.category.toLowerCase().trim();

        return this.searchItems(el, filter.search) && filter.categories.includes(category);
    }

    emptyCheck(filter: IFilter) {
        const isEmpty = !filter.search && !filter.categories.length && !filter.brands.length;

        return isEmpty;
    }

    initializeFilter(filter: IFilter) {
        filter.categories = filter.categories.map((item) => item.toLowerCase().trim());
        filter.brands = filter.brands.map((item) => item.toLowerCase().trim());
        filter.search = filter.search.toLowerCase().trim();
    }

    searchByPrice(filter: IFilter, el: Product) {
        return filter.price.to >= el.price && filter.price.from <= el.price;
    }

    searchByStock(filter: IFilter, el: Product) {
        return filter.stock.to >= el.stock && filter.stock.from <= el.stock;
    }

    searchItems(el: Product, value: string) {
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

    filterItemsCategory(categories: Array<string>, initial: Array<Product>) {
        this.filtred = initial.filter((el) => categories.includes(el.category));
    }

    filterItemsBrand(brands: Array<string>, initial: Array<Product>) {
        this.filtred = initial.filter((el) => brands.includes(el.brand));
    }
}

export default CollectionProducts;
