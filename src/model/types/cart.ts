export interface CartItem {
    productId: number;
    count: number;
    order: number;
}

export interface ICartPagination {
    limit: number;
    page: number;
    [index: string]: number;
}

export interface ICartLocalStorage {
    params: {
        limit: number;
        page: number;
    };
    products: Array<CartItem>;
}
