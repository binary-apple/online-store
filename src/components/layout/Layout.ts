import Header from './header/Header';
import Footer from './footer/Footer';
import { IRenderComponent } from '../pages/types/IRenderComponent';
import { IInstanceContext } from '../../utils/context/types/IContext';

const header = new Header();
const footer = new Footer();

class Layout {
    async init(context: IInstanceContext, component: IRenderComponent | undefined) {
        return await this.render(context, component);
    }

    async render(context: IInstanceContext, component: IRenderComponent | undefined) {
        return `
            <div class="container-fluid">
                ${await header.init()}
                <main class="main">
                    ${await component?.init(context)}
                </main>
                ${await footer.init()}
            </div>
        `;
    }
}

export default Layout;
