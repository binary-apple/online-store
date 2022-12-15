import { IRouter, IRouterItem } from "../../router/types/IRouter";
import { IStore } from "../../store/types/IStore";

export interface IApp {
    use(module: IRouter | IStore): void;
    start(root: HTMLElement): void;
}

export interface IContext {
    root: HTMLElement;
    $route: IRouter;
    $store: IStore;
    router: IRouterItem;
    [index: string]: IRouter | IStore | HTMLElement | IRouterItem;
}

export interface IAppModule {
    init(context: IContext): void;
    name: string;
}
