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
    images: Array<string>;
    thumbnail: string;
    [index: string]: number | string | Array<string>;
}
