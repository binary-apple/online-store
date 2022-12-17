import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

class Product extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    init() {
        return this.render();
    }

    render() {
        return `
            PRODUCT PAGE;
        `;
    }
}

export default Product;
