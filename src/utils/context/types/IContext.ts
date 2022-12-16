import { IAppModule } from '../../../app/types/IApp';
import { IRouter, IRouterItem } from '../../../router/types/IRouter';
import { IStore } from '../../../store/types/IStore';
import { IListeners } from '../../listeners/types/IListeners';

export interface IContext {
    create(modules: Array<IAppModule>, root: HTMLElement): IInstanceContext;
}

export interface IInstanceContext {
    root: HTMLElement;
    $route: IRouter;
    $store: IStore;
    router: IRouterItem;
    [index: string]: IRouter | IStore | HTMLElement | IRouterItem | IListeners;
}
