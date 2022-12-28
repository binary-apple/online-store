import { Store } from './store';
import { CartItem } from './types/cart';

export class Cart extends Store {
    public productsInCart: Array<CartItem>;
    public allPromocodes: ReadonlyMap<string, number>;
    public promoList: Array<string>;
    public totalDisc: number;

    constructor() {
        super();
        this.productsInCart = [];
        this.allPromocodes = new Map<string, number>([
            ['EPM', 0.1],
            ['RS', 0.1],
        ]);
        this.promoList = [];
        this.totalDisc = 0;
    }

    getTotalPrice(getPriceById: (id: number) => number) {
        return this.productsInCart.reduce(
            (acc: number, cur: CartItem) => acc + getPriceById(cur.productId) * cur.count,
            0
        );
    }

    getPriceById(id: number) {
        // TODO: implement
        return 100 * id;
    }

    getDiscountPrice(getPriceById: (id: number) => number) {
        return this.getTotalPrice(getPriceById) * (1 - this.totalDisc);
    }

    getTotalCount() {
        return this.productsInCart.reduce((acc: number, cur: CartItem) => acc + cur.count, 0);
    }

    addProductToCart(productId: number, count = 1) {
        this.productsInCart.push({ productId: productId, count: count });
        this.notify();
    }

    removeProductFromCart(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);
        if (productIdInCart >= 0) {
            this.productsInCart.splice(productIdInCart, 1);
            this.notify();
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    increaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);
        if (productIdInCart >= 0) {
            this.productsInCart[productIdInCart].count += 1;
            this.notify();
        } else {
            this.addProductToCart(productId, 1);
        }
    }

    decreaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: CartItem) => el.productId === productId);
        if (productIdInCart >= 0) {
            if (this.productsInCart[productIdInCart].count === 1) {
                this.removeProductFromCart(productId);
            } else {
                this.productsInCart[productIdInCart].count -= 1;
                this.notify();
            }
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    addPromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        if (disc && this.promoList.indexOf(promo) < 0) {
            this.promoList.push(promo);
            this.totalDisc += disc;
            this.notify();
        }
    }

    removePromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        const promoId = this.promoList.indexOf(promo);
        if (disc && promoId >= 0) {
            this.promoList.splice(promoId, 1);
            this.totalDisc -= disc;
            this.notify();
        }
    }
}
