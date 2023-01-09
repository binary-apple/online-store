import { IFilter } from '../types/filter';
import { Store } from '../store';

 export class Filter extends Store {
    private filter: IFilter = {
        sort: {
            order: '',
            value: '',
        },
        categories: [],
        brands: [],
        price: {
            // from: 0,
            // to: 0,
            max: Infinity,
            min: 0,
        },
        stock: {
            // from: 0,
            // to: 0,
            max: Infinity,
            min: 0,
        },
        search: '',
    };

    constructor(filter: Partial<IFilter>) {
        super();

        this.filter = Object.assign(this.filter, filter);
    }

    public get() {
        return this.filter;
    }

    public setFilter(filter: Partial<IFilter>) {
        this.filter = Object.assign(this.filter, filter);
        this.notify();
    }
}

export default Filter;
