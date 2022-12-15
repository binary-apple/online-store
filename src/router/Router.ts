import { IContext } from '../app/types/IApp';
import Controller from '../controller/Controller';
import Utils from '../utils/Utils';
import Listeners from '../utils/listeners/Listeners';
import { IRouter, IRouterItem, IRouteURL } from './types/IRouter';

const utils = new Utils();
const controller = new Controller();
const listeners = new Listeners();

class Router implements IRouter {
    name = '$router';
    routers = [] as Array<IRouterItem>;
    context = {} as IContext;
    fetchList = [] as Array<AbortController>;

    constructor(routers: Array<IRouterItem>) {
        this.routers = [...routers];
        this.push = this.push;
        this.init = this.init;
        this.activateLinks = this.activateLinks;
        this.getCurrentRouter = this.getCurrentRouter;
        this.abortFetch = this.abortFetch;
        this.isProductPage = this.isProductPage;
        this.getUrl = this.getUrl;
        this.makeRedirect = this.makeRedirect;
    }

    async init(context: IContext) {
        this.context = context;

        const currentRouter = this.getCurrentRouter();

        if (currentRouter) {
            this.context.router = currentRouter;

            await controller.init(this.context);
    
            this.activateLinks(this.context);

            const initRoute = this.init.bind(this, this.context);
            listeners.onceListener('popstate', initRoute);
        }
    }

    push(pushProps: IRouteURL, e: MouseEvent) {
        if (e) e.preventDefault();

        this.abortFetch()

        const address = this.getUrl(pushProps, e);

        this.makeRedirect(address);

        const { data } = pushProps;
        this.init(data);
    }

    abortFetch() {
        if (this.fetchList.length) {
            this.fetchList.forEach((item) => item.abort());

            this.fetchList.length = 0;
        }
    }

    makeRedirect(address: string) {
        const pathname = utils.getPathName();

        if (pathname !== address) {
            const lastChar = pathname[pathname.length - 1];

            if (lastChar === '/' && pathname.length > 1) {
                address = address.slice(1);
            }

            globalThis.history.pushState(pathname + address, '', address);
        } else {
            globalThis.history.pushState(address, '', address);
        }
    }

    getUrl(pushProps: IRouteURL, e: MouseEvent) {
        const { url } = pushProps;

        let address;

        if (url) {
            address = url;
        } else {
            address = (e.target as HTMLElement).getAttribute('href') as string;
        }

        return address;
    }

    activateLinks(context: IContext) {
        const links = document.querySelectorAll('[href]');

        if (links.length) {
            const push = this.push.bind(this, {url: '', data: context});

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
            router = this.routers.find((el) => el.path === '/product');
        } else {
            router = this.routers.find((el) => el.path === pathname);
        }

        return router || this.routers.find((el) => el.path === 404);
    }

    isProductPage(pathname: string) {
        const params = pathname.split('/');

        return params.length === 3 && params[1] === 'product';
    }
}

export default Router;
