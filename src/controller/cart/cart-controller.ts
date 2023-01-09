import Controller from '../controller';
import CartView from '../../view/cart-view';
import { Cart } from '../../model/cart';
import CartLocalStorage from '../../model/cart-local-storage';
import { HashRouter } from '../../router/router';
import { ICartPagination } from '../../model/types/cart';
import { CartName } from '../../model/types/cart';
import { IRouter } from '../../router/types/router';
import { Product } from '../../model/types/product';

class CartController extends Controller {
    cart: Cart;
    cartLS: CartLocalStorage;

    constructor(router: HashRouter) {
        super(router);

        this.cartLS = new CartLocalStorage(CartName.LOCAL_STORAGE_NAME);
        this.cart = new Cart(this.cartLS.get(), this.cartLS.getPromocodes());
    }

    async init() {
        const cartView = new CartView(this.cart);
        cartView.init();
        this.setPaginationFromQueryParams();

        cartView.breadCrumbsClickHandler((e: Event) => {
            const htmlTarget = e.target as HTMLElement;

            const isException = htmlTarget.dataset.exception;

            if (isException) {
                e.preventDefault();
            }

            const isLink = htmlTarget.tagName === 'A' && !isException;

            if (isLink) {
                e.preventDefault();

                const { href } = htmlTarget.dataset;

                if (href) {
                    this.router.navigateTo(href);
                }
            }
        });

        cartView.removeSelectedClickHandler((checkboxs: Array<HTMLInputElement>) => {
            if (checkboxs.length) {
                checkboxs.forEach((item) => {
                    if (item.checked) {
                        const productId = +item.value;

                        this.cart.removeProductFromCart(productId);
                    }
                });

                this.cartLS.set(this.cart.get());
            }

            const { page, limit } = this.cart.getPagination();
            const hasProducts = this.cart.checkProducts(limit, page);

            if (!hasProducts) {
                this.cart.changeParamsPage(page);
                this.decreasePageInQueryParams(page);
            }
        });

        cartView.changeLimitPaginationHandler((target: HTMLInputElement) => {
            this.cart.changeParamsLimit(+target.value);
            this.cartLS.set(this.cart.get());

            this.router.addSearchParams('limit', target.value);

            const { page, limit } = this.cart.getPagination();
            const hasProducts = this.cart.checkProducts(limit, page);

            if (!hasProducts) {
                this.decreasePageInQueryParams(page);
            }
        });

        cartView.changePagePaginationClickHandler((e: Event, type: string) => {
            this.cart.changeParamsPage(type);
            this.cartLS.set(this.cart.get());

            const page = '' + this.cart.getPagination().page;

            this.router.addSearchParams('page', page);
        });

        cartView.productLinkClickHandler((e: Event) => {
            const htmlTarget = e.target as HTMLElement;

            const isException = htmlTarget.dataset.exception;

            if (isException) {
                e.preventDefault();
            }

            const isLink = htmlTarget.tagName === 'A' || (htmlTarget.closest('a') && !isException);

            if (isLink) {
                e.preventDefault();

                let href;

                if (htmlTarget.tagName === 'A') {
                    href = htmlTarget.dataset.href;
                } else {
                    const parentA = htmlTarget.closest('a');

                    if (parentA) {
                        href = parentA.dataset.href;
                    }
                }

                if (href) {
                    this.router.navigateTo(href, '');
                }
            }
        });

        cartView.changeQuntityProductInCart((e: Event, type: string, productId: number) => {
            if (type === 'increase') {
                const cartState = this.cart.get();

                const product = cartState.find((el) => el.id === productId);

                if (product) {
                    this.cart.increaseProductCount(product);
                }
            } else {
                this.cart.decreaseProductCount(productId);

                const { page, limit } = this.cart.getPagination();
                const hasProducts = this.cart.checkProducts(limit, page);

                if (!hasProducts) {
                    this.decreasePageInQueryParams(page);
                }
            }

            this.cartLS.set(this.cart.get());
        });

        cartView.confirmPromoCodeClickHandler((promo: string) => {
            this.cart.addPromocode(promo);

            this.cartLS.setPromocodes(this.cart.getPromocodes());
            this.cartLS.set(this.cart.get());
        });

        cartView.removePromoCodeClickHandler((promo: string) => {
            this.cart.removePromocode(promo);
            this.cartLS.setPromocodes(this.cart.getPromocodes());
            this.cartLS.set(this.cart.get());
        });

        cartView.makeOrder(
            (products: Array<Product>) => {
                products.forEach((item) => {
                    this.cart.removeProductFromCart(item.id);
                });
                this.cart.clearPromocodes();

                this.cart.emptyOrderArray();
                this.cartLS.setPromocodes(this.cart.getPromocodes());
                this.cartLS.set(this.cart.get());
            },
            () => {
                this.router.navigateTo('/');
            },
            false
        );

        this.checkRedirectFromProduct(cartView);
    }

    setPaginationFromQueryParams() {
        const params = this.router.getSearchParams() as ICartPagination;

        const hasParams = !!Object.keys(params).filter((el) => el).length;

        if (hasParams) {
            if (params.limit) {
                this.cart.changeParamsLimit(params.limit);
            }

            if (params.page) {
                this.cart.changeParamsPage(params.page);
            }
        }

        const hasProducts = this.cart.checkProducts(params.limit, params.page);

        if (!hasProducts) {
            const pagination = this.cart.getPagination();

            this.router.addSearchParams('page', '' + pagination.page);
        }
    }

    decreasePageInQueryParams(page: number) {
        const pageValue = page - 1 > 0 ? page - 1 : 1;
        this.cart.changeParamsPage(pageValue);

        this.router.addSearchParams('page', '' + pageValue);
    }

    checkRedirectFromProduct(cartView: CartView) {
        const page = (this.router as unknown as IRouter)._currentPage;

        if (page.state) {
            const pageState = JSON.parse(page?.state as string);

            if (pageState.isRedirect) {
                this.cart.emptyOrderArray();
                this.cart.addToOrder(pageState.product);

                cartView.makeOrder(
                    (products: Array<Product>) => {
                        products.forEach((item) => {
                            this.cart.removeProductFromCart(item.id);
                        });

                        this.cartLS.setPromocodes(this.cart.getPromocodes());
                        this.cart.clearPromocodes();
                        this.cartLS.set(this.cart.get());
                    },
                    () => {
                        this.router.navigateTo('/');
                    },
                    true
                );

                page.state = null;
            }
        }
    }
}

export default CartController;
