import { IInstanceContext } from '../../../utils/context/types/IContext';
import { IProductsAPI } from '../../../api/types/IProducts';

class MainPage {
    products = {} as IProductsAPI;

    async init(context: IInstanceContext) {
        this.products = await context.$api?.getProducts(null);

        const cards = this.products?.products.map((item) => `<div>${item.title}</div>`);

        return await this.render(cards);
    }

    render(cards: Array<string>) {
        return `
            <ul>
                ${cards?.join('')}
                <li>
                    <a href="/cart">cart</a>
                </li>
                <li>
                    <a href="/product/1">product</a>
                </li>
                <li>
                    <a href="/product/2">product2</a>
                </li>
                <li>
                    <a href="/product/3">product3</a>
                </li>
            </ul>
        `;
    }
}

export default MainPage;
