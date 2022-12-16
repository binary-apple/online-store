import { IInstanceContext } from '../utils/context/types/IContext';
import { IStore, IStoreData } from './types/IStore';

class Store implements IStore {
    name = '$store';
    context = {} as IInstanceContext;
    required = [] as Array<string>;
    data = {} as IStoreData;

    constructor() {
        this.init = this.init;
        this.getRouters = this.getRouters;
    }

    init(context: IInstanceContext) {
        ((context.$store as IStore).data as IStoreData).routers = this.getRouters();

        this.context = context;
    }

    getRouters() {
        return [
            { path: '/', name: 'main' },
            { path: '/cart', name: 'cart' },
            { path: '/product', name: 'product' },
            { path: 404, name: 'error' },
        ];
    }
}

export default Store;
