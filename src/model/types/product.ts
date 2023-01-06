export interface Product {
    category: string;
    brand: string;
    price: number;
    stock: number;
    rating: number;
    discountPercentage: number;
    description: string;
    title: string;
    order: number;
    count: number;
    id: number;
    thubnail: string;
    images: Array<string>;
    [index: string]: number | string | Array<string>;
}
