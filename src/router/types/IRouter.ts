import { IContext } from "../../app/types/IApp";

export interface IRouterItem {
    path: string | number;
    name: string;
}

export type IRouteURL = {
    url: string;  
    data: IContext;
}

export interface IRouter {
    name: string;
    routers: Array<IRouterItem>;
    push(props: IRouteURL | null, e: MouseEvent): void;
    init(context: IContext): void;
    activateLinks(context: IContext): void;
    getCurrentRouter(): IRouterItem | undefined;
    context: IContext;
    fetchList: Array<AbortController>;
}
