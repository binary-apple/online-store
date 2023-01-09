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
    page?: number;
    limit?: number;
    [index: string]: number | undefined;
}

export interface IPageProductParams {
    [index: string]: undefined;
}
