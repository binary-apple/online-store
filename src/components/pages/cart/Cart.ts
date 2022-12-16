import Request from '../../../utils/request/Requst';
import { IInstanceContext } from '../../../utils/context/types/IContext';

const request = new Request();

class Cart {
    async init(context: IInstanceContext) {
        const cart = await request.get(context, 'https://dummyjson.com/products?limit=100');

        return this.render(cart.limit);
    }

    render(image: number) {
        return `
            Количество продуктов: ${image};        
        `;
    }
}

export default Cart;
