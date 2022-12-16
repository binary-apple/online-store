import { IProductsAPI } from '../../../api/types/IProducts';

class MainPage {
    products = {} as IProductsAPI;

    async init() {
        return await this.render();
    }

    render() {
        return `
            <ul></ul>
        `;
    }
}

export default MainPage;
