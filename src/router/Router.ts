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
    fetchList = [] as Array<Promise<Response>>;

    constructor(routers: Array<IRouterItem>) {
        this.routers = [...routers];
        this.push = this.push;
        this.init = this.init;
        this.activateLinks = this.activateLinks;
        this.getCurrentRouter = this.getCurrentRouter;
    }

    init(context: IContext) {
        this.context = context;

        const currentRouter = this.getCurrentRouter();

        if (currentRouter) {
            this.context.router = currentRouter;

            controller.init(this.context);
    
            this.activateLinks(this.context);

            const initRoute = this.init.bind(this, this.context);
            listeners.onceListener('popstate', initRoute);
        }
    }

    push(pushProps: IRouteURL, e: MouseEvent) {
        if (this.fetchList.length) {
        }

        if (e) {
            e.preventDefault();
        }

        let address = '';
        const { url, data } = pushProps;

        if (url) {
            address = url;
        } else {
            address = (e.target as HTMLElement).getAttribute('href') as string;
        }

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

        this.init(data);
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

        if (pathname.split('/').length === 3) {
            router = this.routers.find((el) => el.path === '/product');
        } else {
            router = this.routers.find((el) => el.path === pathname);
        }

        return router || this.routers.find((el) => el.path === 404);
    }
}

export default Router;
