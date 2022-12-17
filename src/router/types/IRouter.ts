import { IInstanceContext } from '../../utils/context/types/IContext';

export interface IRouterItem {
    path: string | number;
    name: string;
}

export type IRouteURL = {
    url: string;
    data: IInstanceContext;
};

export interface IRouter {
    name: string;
    routers: Array<IRouterItem>;
    push(props: IRouteURL | null, e: MouseEvent): void;
    init(context: IInstanceContext): void;
    activateLinks(context: IInstanceContext): void;
    getCurrentRouter(): IRouterItem | undefined;
    context: IInstanceContext;
    currentRouter: IRouterItem;
}
