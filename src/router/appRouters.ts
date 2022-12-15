import { IRouterItem } from "./types/IRouter";

export default [
    { path: '/', name: 'main' },
    { path: '/cart', name: 'cart' },
    { path: '/product', name: 'product' },
    { path: 404, name: 'error' },
] as Array<IRouterItem>;
