import { Store } from '../store';
import { ICart } from '../types/cart';
import { Product } from '../types/product';

export class Cart extends Store {
    public allPromocodes: ReadonlyMap<string, number>;
    public promoList: Array<string>;
    private cart: ICart;

    constructor(cart: ICart) {
        super();

        this.cart = cart;

        this.allPromocodes = new Map<string, number>([
            ['EPM', 0.1],
            ['RS', 0.1],
        ]);

        this.promoList = [];
    }

    public get() {
        return this.cart;
    }

    public getExistPromocodes() {
        return this.allPromocodes;
    }

    public getConfirmedPromocodes() {
        const promocodes = this.promoList.map((el) => {
            return {
                name: el,
                discount: this.allPromocodes.get(el) as number,
            };
        });

        return promocodes;
    }

    public getCartPrice() {
        const totalPrice = this.cart.products.reduce((initial, current) => {
            const currentDiscount = (current.price / 100) * current.discountPercentage;
            const price = (current.price - currentDiscount) * current.count;

            return initial + price;
        }, 0);

        return totalPrice;
    }

    public getTotalPrice() {
        return this.getCartPrice() - this.getDiscountPrice();
    }

    public getDiscountPrice() {
        const onePercent = this.getCartPrice() / 100;

        const discountPercentage =
            this.getConfirmedPromocodes().reduce((initial, current) => initial + current.discount, 0) * 100;

        const disc = discountPercentage * onePercent;

        return disc;
    }

    public getTotalCount() {
        return this.cart.products.reduce((acc: number, cur: Product) => acc + cur.count, 0);
    }

    public addProductToCart(product: Product, count = 1) {
        const productItem = {
            ...product,
            count,
            order: this.cart.products.length + 1,
        };

        this.cart.products.push(productItem);

        this.notify();
    }

    public removeProductFromCart(id: number) {
        const index = this.cart.products.findIndex((el: Product) => el.id === id);

        if (index >= 0) {
            this.cart.products.splice(index, 1);

            this.cart.products.map((item, index) => (item.order = index + 1));
            this.notify();
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public increaseProductCount(product: Product) {
        this.cart.products = this.cart.products.map((item) => {
            if (item.id === product.id) {
                if (item.count + 1 <= product.stock) {
                    item.count += 1;
                }
            }

            return item;
        });

        this.notify();
    }

    public decreaseProductCount(productId: number) {
        const productIdInCart = this.cart.products.findIndex((el: Product) => el.id === productId);

        if (productIdInCart >= 0) {
            this.cart.products = this.cart.products
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

            this.notify();
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public addPromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        if (disc && this.promoList.indexOf(promo) < 0) {
            this.promoList.push(promo);

            this.notify();
        }
    }

    public removePromocode(promo: string) {
        const disc = this.allPromocodes.get(promo);
        const promoId = this.promoList.indexOf(promo);
        if (disc && promoId >= 0) {
            this.promoList.splice(promoId, 1);

            this.notify();
        }
    }

    public changeParamsLimit(value: number) {
        this.cart.params.limit = value;
        this.notify();
    }

    public changeParamsPage(type: string) {
        if (type === 'increase') {
            this.cart.params.page = this.cart.params.page + 1;
        } else {
            this.cart.params.page = this.cart.params.page - 1;

            if (this.cart.params.page < 1) {
                this.cart.params.page = 1;
            }
        }

        this.notify();
    }
}
