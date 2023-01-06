export interface Product {
    id: number;
    category: string;
    brand: string;
    price: number;
    stock: number;
    rating: number;
    discountPercentage: number;
    description: string;
    title: string;
    thumbnail: string;
    order?: number;
    count?: number;
    images: Array<string>;
    [index: string]: number | string | Array<string> | undefined;
}
