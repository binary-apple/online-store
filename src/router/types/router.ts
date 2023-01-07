export interface IRouter {
    mode: string;
    page404: () => void;
    _currentPage: {
        params: Array<unknown>;
        state: unknown;
    };
}
