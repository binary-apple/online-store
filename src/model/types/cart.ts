import { Product } from './product';

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
