import Header from './header/Header';
import Footer from './footer/Footer';
import { IRenderComponent } from '../pages/types/IRenderComponent';
import { IInstanceContext } from '../../utils/context/types/IContext';
import Component from '../Component';

class Layout extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    async init(component: IRenderComponent | undefined) {
        const header = new Header(this.context);
        const footer = new Footer(this.context);

        return await this.render(component, header, footer);
    }

    async render(component: IRenderComponent | undefined, header: IRenderComponent, footer: IRenderComponent) {
        return `
            <div class="container-fluid">
                ${await header.init()}
                <main class="main">
                    ${await component?.init()}
                </main>
                ${await footer.init()}
            </div>
        `;
    }
}

export default Layout;
