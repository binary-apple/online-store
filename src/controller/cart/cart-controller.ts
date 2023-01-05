import Controller from '../controller';
import CartView from '../../view/cart-view';
import { Cart } from '../../model/cart';
import CartLocalStorage from '../../model/cart-local-storage';
import { HashRouter } from '../../router/router';
import { Product } from '../../model/types/product';
import Request from '../../api/request';
import { ICartPagination } from '../../model/types/cart';

const ONLINE_STORE_APPLE_NEPO = process.env.LOCAL_STORAGE_NAME as string;

class CartController extends Controller {
    cart: Cart;
    cartLS: CartLocalStorage;

    constructor(router: HashRouter) {
        super(router);

        this.cartLS = new CartLocalStorage(ONLINE_STORE_APPLE_NEPO);
        this.cart = new Cart();
    }

    async init() {
        if (!this.cart.get().length) {
            const request = new Request();
            const response = await request.make('GET', '/products?limit=100');

            response.products.slice(0, 8).forEach((item: Product) => {
                this.cart.addProductToCart(item, 1);
                this.cartLS.set(this.cart.get());
            });
        }

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

        cartView.selectAllChangeHandler((e: Event, container: HTMLElement) => {
            const inputTarget = e.target as HTMLInputElement;

            const productCbs = container.querySelectorAll('input[type="checkbox"]');

            if (productCbs.length) {
                if (inputTarget.checked) {
                    productCbs.forEach((item) => ((item as HTMLInputElement).checked = true));
                } else {
                    productCbs.forEach((item) => ((item as HTMLInputElement).checked = false));
                }
            }
        });

        cartView.removeSelectedClickHandler((container: HTMLElement) => {
            const productCbs = container.querySelectorAll('input[type="checkbox"]');

            if (productCbs.length) {
                productCbs.forEach((item) => {
                    const cb = item as HTMLInputElement;

                    if (cb.checked) {
                        const productId = +cb.value;

                        this.cart.removeProductFromCart(productId);

                        this.cartLS.set(this.cart.get());
                    }
                });
            }

            const { page, limit } = this.cart.getPagination();
            const hasProducts = this.cart.checkProducts(limit, page);

            if (!hasProducts) {
                this.cart.changeParamsPage(page);
                this.decreasePageInQueryParams(page);
            }
        });

        cartView.changeLimitPaginationHandler((e: Event) => {
            const inputTarget = e.target as HTMLInputElement;

            if (inputTarget.value === '') {
                return;
            }

            this.cart.changeParamsLimit(+inputTarget.value);
            this.cartLS.set(this.cart.get());

            this.router.addSearchParams('limit', inputTarget.value);

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

        cartView.linkClickHandler((e: Event) => {
            const htmlTarget = e.target as HTMLElement;

            const isException = htmlTarget.dataset.exception;

            if (isException) {
                e.preventDefault();
            }

            const isLink = htmlTarget.tagName === 'A' || (htmlTarget.closest('a') && !isException);

            if (isLink) {
                e.preventDefault();
                const { href } = htmlTarget.dataset;

                if (href) {
                    this.router.navigateTo(href);
                }
            }
        });

        cartView.changeQuntityProductInCart((e: Event, type: string) => {
            const htmlTarget = e.target as HTMLElement;
            const cartState = this.cart.get();

            const productWrapper = htmlTarget.closest('.cart-item') as HTMLElement;

            if (productWrapper) {
                const checkbox = productWrapper.querySelector('.checkbox-fake__input') as HTMLInputElement;

                if (checkbox) {
                    const productId = +checkbox.value;

                    const product = cartState.find((el) => el.id === productId);

                    if (product) {
                        if (type === 'increase') {
                            this.cart.increaseProductCount(product);
                        } else {
                            this.cart.decreaseProductCount(product.id);

                            const { page, limit } = this.cart.getPagination();
                            const hasProducts = this.cart.checkProducts(limit, page);

                            if (!hasProducts) {
                                this.decreasePageInQueryParams(page);
                            }
                        }

                        this.cartLS.set(this.cart.get());
                    }
                }
            }
        });

        cartView.inputHandlerPromoCode();

        cartView.confirmPromoCodeClickHandler((wrapper: HTMLElement) => {
            if (wrapper) {
                const promoWrapper = wrapper.querySelector('b') as HTMLElement;

                if (promoWrapper) {
                    const promo = promoWrapper.innerText.trim();
                    this.cart.addPromocode(promo);

                    this.cartLS.set(this.cart.get());
                }
            }
        });

        cartView.removePromoCodeClickHandler((e: Event) => {
            const htmlTarget = e.target as HTMLElement;

            const isRemovePromocodeBtn = htmlTarget.classList.contains('cart-total__promo-remove');

            if (isRemovePromocodeBtn) {
                const promoItem = htmlTarget.closest('.cart-total__promo-item');

                if (promoItem) {
                    const promoNameWrapper = promoItem.querySelector('.cart-promocode__name') as HTMLElement;

                    if (promoNameWrapper) {
                        const promo = promoNameWrapper.innerText.trim();
                        this.cart.removePromocode(promo);
                        this.cartLS.set(this.cart.get());
                    }
                }
            }
        });
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
        const pageValue = page - 1;
        this.cart.changeParamsPage(pageValue);

        this.router.addSearchParams('page', '' + pageValue);
    }
}

export default CartController;
