export interface IRouter {
    mode: string;
    page404: () => void;
    _currentPage: {
        params: Array<unknown>;
        state: unknown;
    };
}

export interface IQueryParams {
    [index: string]: RegExp;
}

export interface IPageCartParams {
    page: number;
    limit: number;
    [index: string]: number | undefined;
}

export interface IPageProductParams {
    [index: string]: undefined;
}

export interface IPageMainParams {
    category: string;
    brand: string;
    big: boolean;
    search: string;
    'price-min': number;
    'price-max': number;
    'stock-min': number;
    'stock-max': number;
    [index: string]: string | boolean | number;
}
