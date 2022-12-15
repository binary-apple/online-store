import { IContext } from "../../../app/types/IApp";
import { IRouter } from "../../../router/types/IRouter";

class Cart {
    async init(context: IContext) {
        const cart = fetch('https://dummyjson.com/products?limit=100');
        (context.$router as IRouter).fetchList.push(cart);
    
        const image = await (await cart).json();


        return this.render(image.limit);
    }

    render(image: number) {
        return `
            Количество продуктов: ${image};        
        `
    }
}

export default Cart;
