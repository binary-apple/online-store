import Controller from '../controller/Controller';
import { IListeners } from '../utils/listeners/types/IListeners';
import Utils from '../utils/Utils';
import { IRouter, IRouterItem, IRouteURL } from './types/IRouter';
import { IInstanceContext } from '../utils/context/types/IContext';

const utils = new Utils();
const controller = new Controller();

class Router implements IRouter {
    name = '$router';
    routers = [] as Array<IRouterItem> | undefined;
    context = {} as IInstanceContext;
    fetchList = [] as Array<AbortController>;
    currentRouter = {} as IRouterItem;

    constructor() {
        this.push = this.push;
        this.init = this.init;
        this.activateLinks = this.activateLinks;
        this.getCurrentRouter = this.getCurrentRouter;
        this.abortFetch = this.abortFetch;
        this.isProductPage = this.isProductPage;
        this.getUrl = this.getUrl;
        this.makeRedirect = this.makeRedirect;
        this.addRoutersToContext = this.addRoutersToContext;
        this.activateController = this.activateController;
    }

    async init(context: IInstanceContext) {
        this.routers = context.$store?.data.routers;

        this.addRoutersToContext(context);

        const currentRouter = this.getCurrentRouter();

        if (currentRouter) {
            await this.activateController(context, currentRouter);
        }

        this.context = context;
    }

    addRoutersToContext(context: IInstanceContext) {
        if ((context.$router as IRouter)?.routers) {
            (context.$router as IRouter).routers = this.routers;
        }
    }

    async activateController(context: IInstanceContext, currentRouter: IRouterItem) {
        (context.$router as IRouter).currentRouter = currentRouter;

        await controller.init(context);

        this.activateLinks(context);

        const initRoute = this.init.bind(this, context);
        const abortFetch = this.abortFetch.bind(this);

        (context.$listeners as IListeners).onceListener('popstate', () => {
            initRoute();
            abortFetch();
        });
    }

    push(pushProps: IRouteURL, e: MouseEvent | undefined = undefined) {
        if (e) e.preventDefault();

        this.abortFetch();

        const address = this.getUrl(pushProps, e);

        this.makeRedirect(address);

        const { data } = pushProps;
        this.init(data);

        return address;
    }

    abortFetch() {
        if (this.fetchList.length) {
            this.fetchList.forEach((item) => item.abort());

            this.fetchList.length = 0;
        }
    }

    makeRedirect(address: string | undefined) {
        const pathname = utils.getPathName();

        if (pathname !== address) {
            const lastChar = pathname[pathname.length - 1];

            if (lastChar === '/' && pathname.length > 1 && address) {
                address = address.slice(1);
            }

            globalThis.history.pushState(pathname + address, '', address);
        } else {
            globalThis.history.pushState(address, '', address);
        }
    }

    getUrl(pushProps: IRouteURL, e: MouseEvent | undefined) {
        const { url } = pushProps;

        let address;

        if (url) {
            address = url;
        } else if (!url && e) {
            address = (e.target as HTMLElement).getAttribute('href') as string;
        }

        return address;
    }

    activateLinks(context: IInstanceContext) {
        const links = document.querySelectorAll('[href]');

        if (links.length) {
            const push = this.push.bind(this, { url: '', data: context });

            links.forEach((item) => {
                const clone = utils.replaceItem(item as HTMLElement);

                clone.addEventListener('click', push as EventListener);
            });
        }
    }

    getCurrentRouter() {
        const pathname = utils.getPathName();

        let router;

        const isProductPage = this.isProductPage(pathname);

        if (isProductPage) {
            router = this.routers?.find((el) => el.path === '/product');
        } else {
            router = this.routers?.find((el) => el.path === pathname);
        }

        return router || this.routers?.find((el) => el.path === 404);
    }

    isProductPage(pathname: string) {
        const params = pathname.split('/');

        return params.length === 3 && params[1] === 'product';
    }
}

export default Router;
