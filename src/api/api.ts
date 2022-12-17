import { IInstanceContext } from '../utils/context/types/IContext';
import Request from './request/Request';
import { IAPI } from './types/IAPI';

const request = new Request();

class API implements IAPI {
    name = '$api';
    context = {} as IInstanceContext;

    constructor() {
        this.init = this.init;
        this.getProducts = this.getProducts;
    }

    init(context: IInstanceContext) {
        this.context = context;
    }

    async getProducts(context: IInstanceContext, e?: MouseEvent | undefined) {
        const apiProps = {
            context: context,
            url: 'https://dummyjson.com/products?limit=100',
            e,
        };

        const products = await request.get(apiProps);

        return products;
    }
}

export default API;
