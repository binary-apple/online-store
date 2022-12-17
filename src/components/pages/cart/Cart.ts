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
            <a href="/">main</a>
            Количество продуктов: ;
            <a href="/cart">stand</a>        
        `;
    }
}

export default Cart;
