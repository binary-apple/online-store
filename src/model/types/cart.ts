import { Product } from './product';

export interface CartItem {
    productId: number;
    count: number;
}

export interface ICartPagination {
    limit: number;
    page: number;
    [index: string]: number;
}

export interface ICart {
    params: ICartPagination;
    products: Array<Product>;
}

export interface IPromoCode {
    name: string;
    discount: number;
}

export enum CartName {
    LOCAL_STORAGE_NAME = 'online-store-apple-nepo',
}
