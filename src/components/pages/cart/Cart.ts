import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

class Cart extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    async init() {
        return this.render();
    }

    render() {
        return `
            Количество продуктов: ;        
        `;
    }
}

export default Cart;
