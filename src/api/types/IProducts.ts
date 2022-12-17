export interface IProductsAPI {
    products: Array<IProductAPI>;
}

export interface IProductAPI {
    title: string;
    category: string;
}
