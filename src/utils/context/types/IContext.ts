import { IAPI } from '../../../api/types/IAPI';
import { IAppModule } from '../../../app/types/IApp';
import { IRouter, IRouterItem } from '../../../router/types/IRouter';
import { IStore } from '../../../store/types/IStore';

export interface IContext {
    create(modules: Array<IAppModule>, root: HTMLElement): IInstanceContext;
}

export interface IInstanceContext {
    root: HTMLElement;
    $route: IRouter;
    $store: IStore;
    $api: IAPI;
    router: IRouterItem;
    [index: string]: IAppModule | HTMLElement | IRouterItem;
}
