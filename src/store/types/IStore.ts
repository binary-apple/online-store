import { IRouterItem } from '../../router/types/IRouter';
import { IInstanceContext } from '../../utils/context/types/IContext';

export interface IStore {
    name: string;
    init(context: IInstanceContext): void;
    required: Array<string>;
    getRouters(): Array<IRouterItem>;
    data: IStoreData;
}

export interface IStoreData {
    routers: Array<IRouterItem>;
}
