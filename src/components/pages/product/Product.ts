import { IContext } from "../../../app/types/IApp";

class Product {
    init(context: IContext) {
        return this.render();
    }

    render() {
        return `
            PRODUCT PAGE;
        `;
    }
}

export default Product;
