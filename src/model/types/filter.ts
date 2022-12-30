export interface IFilter {
    sort: {
        order: string;
        value: string;
    };
    categories: Array<string>;
    brands: Array<string>;
    price: {
        from: number;
        to: number;
        man: number;
        min: number;
    };
    stock: {
        from: number;
        to: number;
        max: number;
        min: number;
    };
    search: string;
}
