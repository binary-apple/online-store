import { Store } from './store';
import { Product } from './types/product';
import { ICartPagination } from './types/cart';

export class Cart extends Store {
    public productsInCart: Array<Product>;
    public allPromocodes: ReadonlyMap<string, number>;
    public promoList: Array<string>;
    public totalDisc: number;
    pagination = {
        limit: 3,
        page: 1,
    } as ICartPagination;
    openModalPage = false;
    productsToOrder: Array<Product> = [];

    constructor(products: Array<Product>) {
        super();
        this.productsInCart = [...products];
        this.allPromocodes = new Map<string, number>([
            ['EPM', 0.1],
            ['RS', 0.1],
        ]);
        this.promoList = [];
        this.totalDisc = 0;
    }

    public getPagination() {
        return this.pagination;
    }

    public get() {
        return this.productsInCart;
    }

    public getProductsWithPagination() {
        const { limit, page } = this.pagination;

        const [start, end] = this.getPaginationIndex(limit, page);

        return this.productsInCart.slice(start, end);
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
        return this.productsInCart
            .reduce((acc: number, cur: Product) => {
                return acc + cur.price * (cur.count ? cur.count : 0);
            }, 0)
            .toFixed(2);
    }

    public getTotalPrice() {
        const cartPrice = +this.getCartPrice();
        const discountByPromocodes = +this.getDiscountPrice();

        return (cartPrice - discountByPromocodes).toFixed(2);
    }

    public getDiscountPrice() {
        const promocodes = this.getConfirmedPromocodes();
        const discountPercentage = promocodes.reduce((initial, current) => initial + current.discount * 100, 0);
        const cartPrice = +this.getCartPrice();

        return ((cartPrice / 100) * discountPercentage).toFixed(2);
    }

    public productInCart(product: Product) {
        return !!this.productsInCart.find((el) => el.id === product.id);
    }

    public getTotalCount() {
        return this.productsInCart.reduce((acc: number, cur: Product) => acc + (cur.count ? cur.count : 0), 0);
    }

    public addProductToCart(product: Product, count = 1) {
        const order = this.productsInCart.length + 1;

        this.productsInCart.push({ ...product, count: count, order });
        this.notify();
    }

    public removeProductFromCart(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: Product) => el.id === productId);
        if (productIdInCart >= 0) {
            this.productsInCart.splice(productIdInCart, 1);
            this.notify();
        } else {
            throw new Error('You are trying to remove from the cart a product that is not in the cart');
        }
    }

    public increaseProductCount(product: Product) {
        const productIdInCart = this.productsInCart.findIndex((el: Product) => el.id === product.id);

        if (productIdInCart >= 0) {
            if (!product.count) product.count = 0;

            if (product.stock >= product.count + 1) {
                product.count += 1;
                this.notify();
            }
        } else {
            this.addProductToCart(product, 1);
        }
    }

    public decreaseProductCount(productId: number) {
        const productIdInCart = this.productsInCart.findIndex((el: Product) => el.id === productId);

        if (productIdInCart >= 0) {
            if (this.productsInCart[productIdInCart].count === 1) {
                this.removeProductFromCart(productId);
            } else {
                if (!this.productsInCart[productIdInCart].count) this.productsInCart[productIdInCart].count = 0;
                this.productsInCart[productIdInCart].count! -= 1;
                this.notify();
            }
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

    public isProductInCart(id: number) {
        return this.productsInCart.find((product) => product.id === id) ? true : false;
    }

    public getCart() {
        return { productsInCart: this.productsInCart, promoList: this.promoList, totalDisc: this.totalDisc };
    }

    public setCart({
        productsInCart,
        promoList,
        totalDisc,
    }: {
        productsInCart: Product[];
        promoList: string[];
        totalDisc: number;
    }) {
        this.productsInCart = productsInCart;
        this.promoList = promoList;
        this.totalDisc = totalDisc;
        this.notify();
    }

    public changeParamsLimit(limit: number) {
        if (limit < 1) {
            this.pagination.limit = 1;
        } else {
            this.pagination.limit = limit;
        }

        this.notify();
    }

    public checkProducts(limit: number, page: number) {
        const [start, end] = this.getPaginationIndex(limit, page);

        return this.productsInCart.slice(start, end).length;
    }

    private getPaginationIndex(limit: number, page: number) {
        const start = page === 1 ? 0 : (page - 1) * limit;
        const end = page === 1 ? limit : start + limit;

        return [start, end];
    }

    public changeParamsPage(type: string | number) {
        const changeFromEvent = typeof type === 'string';
        const changeFromQuery = typeof type === 'number';

        let page;

        if (changeFromEvent) {
            if (type === 'increase') {
                page = this.pagination.page + 1;
            } else {
                page = this.pagination.page - 1;
            }
        } else {
            page = type;
        }

        if (page < 1) {
            page = 1;
        }

        const { limit } = this.getPagination();

        const hasProducts = this.checkProducts(limit, page);

        if (hasProducts) {
            this.pagination.page = page;
        } else {
            if (changeFromQuery) {
                const counter = page;

                if (counter > 1) {
                    for (let i = 0; i < counter; i++) {
                        page -= 1;
                        if (this.checkProducts(limit, page)) {
                            break;
                        }
                    }
                }

                this.pagination.page = page;
            }
        }

        this.notify();
    }

    public toggleModalPage() {
        this.openModalPage = !this.openModalPage;

        this.notify();
    }

    public addToOrder(product: Product) {
        this.productsToOrder.push(product);
    }

    public emptyOrderArray() {
        this.productsToOrder.length = 0;
    }

    public getOrder() {
        return this.productsToOrder;
    }

    public orderModalIsOpen() {
        return this.openModalPage;
    }

    public empty() {
        this.productsInCart.length = 0;
        this.notify();
    }
}
