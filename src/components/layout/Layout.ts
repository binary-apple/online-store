import Header from './header/Header';
import Footer from './footer/Footer';
import { IRenderComponent } from '../pages/types/IRenderComponent';
import { IContext } from '../../app/types/IApp';

const header = new Header();
const footer = new Footer();

class Layout {
    async init(context: IContext, component: IRenderComponent | undefined) {
        return this.render(context, component);
    }

    async render(context: IContext, component: IRenderComponent | undefined) {
        return  `
            <div class="container-fluid">
                ${await header.init()}
                <main class="main">
                    ${await component?.init(context)}
                </main>
                ${await footer.init()}
            </div>
        `
    }
}

export default Layout;
