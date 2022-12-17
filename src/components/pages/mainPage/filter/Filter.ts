import { IAPI } from '../../../../api/types/IAPI';
import { IProductsAPI } from '../../../../api/types/IProducts';
import { IInstanceContext } from '../../../../utils/context/types/IContext';

class Filter {
    categories = {} as IProductsAPI;

    async init(context: IInstanceContext) {
        this.categories = await (context.$api as IAPI)?.getProducts(context);

        const categories = [...new Set(this.categories?.products?.map((item) => item.category))].join('<br>');

        return await this.render(categories);
    }

    render(categories: string) {
        return `
            ${categories}
        `;
    }
}

export default Filter;
