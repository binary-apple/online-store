import MainPage from '../components/pages/mainPage/MainPage';
import Layout from '../components/layout/Layout';
import Cart from '../components/pages/cart/Cart';
import Error404 from '../components/pages/404/Error404';
import Product from '../components/pages/product/Product';
import { IRouter, IRouterItem } from '../router/types/IRouter';
import { IRenderComponent } from '../components/pages/types/IRenderComponent';
import { IInstanceContext } from "../utils/context/types/IContext";

const layout = new Layout();
const mainPage = new MainPage();
const cart = new Cart();
const error404 = new Error404();
const product = new Product();

class Controller {
    async init(context: IInstanceContext) {
        const { $router, root } = context;

        const templateSlot = this.getTemplateSlot(($router as IRouter).currentRouter);

        window.addEventListener('render', () => {
            const button = document.querySelector('button')
            console.log('rendered', button);
        })

        const template = await layout.init(context, templateSlot);

        root.innerHTML = '';
        root.insertAdjacentHTML('afterbegin', template);
    }

    getTemplateSlot(router: IRouterItem) {
        let slot;

        if (router.name === 'main') {
            slot = mainPage;
        } else if (router.name === 'cart') {
            slot = cart;
        } else if (router.name === 'error') {
            slot = error404;
        } else if (router.name === 'product') {
            slot = product;
        }

        return slot as IRenderComponent;
    }
}

export default Controller;
