import { IAPI } from '../../../../api/types/IAPI';
import { IProductsAPI } from '../../../../api/types/IProducts';
import { IStore } from '../../../../store/types/IStore';
import { IInstanceContext } from '../../../../utils/context/types/IContext';
import Component from '../../../Component';
import { IRenderComponent } from '../../types/IRenderComponent';
import Range from './range/Range';

class Filter extends Component {
    categories = {} as IProductsAPI;

    constructor(context: IInstanceContext) {
        super(context);
    }

    async init() {
        this.categories = await (this.context.$api as IAPI)?.getProducts(this.context);

        const categories = [...new Set(this.categories?.products?.map((item) => item.category))];

        (this.context.$store as IStore).data.categories = categories;

        const range = new Range(this.context);

        return await this.render(categories.join('<br>'), range as unknown as IRenderComponent);
    }

    async render(categories: string, range: IRenderComponent) {
        return `
            <div>
                ${await range.init()}
            </div>
            ${categories}
        `;
    }
}

export default Filter;
