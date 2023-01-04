export interface IRouter {
    _currentPage: {
        params: Array<unknown>;
        query: object;
    };
}
