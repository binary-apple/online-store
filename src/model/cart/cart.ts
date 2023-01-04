import { Store } from '../store';
import { Product } from '../types/product';
import CartLocalStorage from './cart-local-storage';

export class Cart extends Store {
    public productsInCart: Array<Product>;
    public allPromocodes: ReadonlyMap<string, number>;
    public promoList: Array<string>;
    public totalDisc: number;
    cartLocalStorage: CartLocalStorage;

    constructor(cartLocalStorage: CartLocalStorage) {
        super();

        this.cartLocalStorage = cartLocalStorage;

        this.productsInCart = this.cartLocalStorage.cart?.products || [];
        this.allPromocodes = new Map<string, number>([
            ['EPM', 0.1],
            ['RS', 0.1],
        ]);
        this.promoList = [];
        this.totalDisc = 0;
    }

    public get products() {
        return this.productsInCart;
    }

    public get discount() {
        return this.totalDisc;
    }

    public get promocodes() {
        return [this.promoList, this.allPromocodes] as [Array<string>, Map<string, number>];
    }

    public getTotalPrice(getPriceById: (id: number) => number) {
        return this.productsInCart.reduce((acc: number, cur: Product) => acc + getPriceById(cur.id) * cur.count, 0);
    }

    public getDiscountPrice(getPriceById: (id: number) => number) {
        return this.getTotalPrice(getPriceById) * (1 - this.totalDisc);
    }

    public addProductToCart(product: Product, count = 1) {
        const productItem = {
            ...product,
            count,
            order: this.productsInCart.length + 1,
        };

        this.productsInCart.push(productItem);

        return this.productsInCart;
    }

    public removeProductFromCart(id: number) {
        const index = this.productsInCart.findIndex((el: Product) => el.id === id);

        if (index >= 0) {
            this.productsInCart.splice(index, 1);

            this.productsInCart.map((item, index) => (item.order = index + 1));

            return this.productsInCart;
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public increaseProductCount(product: Product) {
        const productIdInCart = this.productsInCart.findIndex((el: Product) => el.id === el.id);

        if (productIdInCart >= 0) {
            this.productsInCart = this.productsInCart.map((item) => {
                if (item.id === product.id) {
                    if (item.count + 1 <= product.stock) {
                        item.count += 1;
                    }
                }

                return item;
            });

            return this.productsInCart;
        } else {
            this.addProductToCart(product, 1);
        }
    }

    public decreaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: Product) => el.id === productId);

        if (productIdInCart >= 0) {
            this.productsInCart = this.productsInCart
                .map((item) => {
                    if (item.id === productId) {
                        item.count -= 1;
                    }

                    return item;
                })
                .filter((el) => el.count > 0)
                .map((item, index) => {
                    item.order = index + 1;

                    return item;
                });

            return this.productsInCart;
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public addPromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        if (disc && this.promoList.indexOf(promo) < 0) {
            this.promoList.push(promo);
            this.totalDisc += disc;

            this.notify();
        }
    }

    public removePromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        const promoId = this.promoList.indexOf(promo);
        if (disc && promoId >= 0) {
            this.promoList.splice(promoId, 1);
            this.totalDisc -= disc;

            this.notify();
        }
    }
}
