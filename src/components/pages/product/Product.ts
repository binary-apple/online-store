import { IInstanceContext } from '../../../utils/context/types/IContext';

class Product {
    init(context: IInstanceContext) {
        return this.render();
    }

    render() {
        return `
            PRODUCT PAGE;
        `;
    }
}

export default Product;
