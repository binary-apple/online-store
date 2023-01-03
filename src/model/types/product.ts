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
    [index: string]: number | string;
}
