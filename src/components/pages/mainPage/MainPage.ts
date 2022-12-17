import { IProductsAPI } from '../../../api/types/IProducts';
import { IInstanceContext } from '../../../utils/context/types/IContext';
import { IAPI } from '../../../api/types/IAPI';
import Filter from './filter/Filter';

const filter = new Filter();

class MainPage {
    products = {} as IProductsAPI;

    async init(context: IInstanceContext) {
        this.products = await (context.$api as IAPI)?.getProducts(context);

        return await this.render(context);
    }

    async render(context: IInstanceContext) {
        return `
            <a href="/cart">to cart</a>
            <ul>
                ${this.products?.products?.map((item) => item.title).join('')}
            </ul>
            <ul>
                ${await filter.init(context)}
            </ul>
        `;
    }
}

export default MainPage;
