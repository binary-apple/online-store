import { IProductsAPI } from '../../../api/types/IProducts';
import { IInstanceContext } from '../../../utils/context/types/IContext';
import { IAPI } from '../../../api/types/IAPI';
import Filter from './filter/Filter';
import Component from '../../Component';
import { IRenderComponent } from '../types/IRenderComponent';

class MainPage extends Component {
    products = {} as IProductsAPI;

    constructor(context: IInstanceContext) {
        super(context);
    }

    async init() {
        this.products = await (this.context.$api as IAPI)?.getProducts(this.context);

        const filter = new Filter(this.context);

        return await this.render(filter as unknown as IRenderComponent);
    }

    async render(filter: IRenderComponent) {
        return `
            <a href="/cart">to cart</a>
            <ul>
                ${this.products?.products?.map((item) => item.title).join('')}
            </ul>
            <ul>
                ${await filter.init()}
            </ul>
        `;
    }
}

export default MainPage;
