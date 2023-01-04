import Controller from '../controller';
import CartView from '../../view/cart-view';
import { Cart } from '../../model/cart/cart';
import CartLocalStorage from '../../model/cart/cart-local-storage';
import { HashRouter } from '../../router/router';
import { Product } from '../../model/types/product';
import Request from '../../api/request';

const ONLINE_STORE_APPLE_NEPO = process.env.LOCAL_STORAGE_NAME as string;

class CartController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    async init() {
        const cartLS = new CartLocalStorage(ONLINE_STORE_APPLE_NEPO);

        const cart = new Cart(cartLS.get());

        if (!cart.get().products.length) {
            const request = new Request();
            const response = await request.make('GET', '/products?limit=100');

            response.products.forEach((item: Product) => {
                cart.addProductToCart(item, 1);
                cartLS.set(cart.get());
            });
        }

        const cartView = new CartView(cart);
        cartView.init();

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

                        cart.removeProductFromCart(productId);

                        cartLS.set(cart.get());
                    }
                });
            }
        });

        cartView.changeLimitPaginationHandler((e: Event) => {
            const inputTarget = e.target as HTMLInputElement;

            if (!inputTarget.value) {
                return;
            }

            if (+inputTarget.value < 1) {
                inputTarget.value = '1';
                cart.changeParamsLimit(+inputTarget.value);
                cartLS.set(cart.get());

                return;
            }

            cart.changeParamsLimit(+inputTarget.value);
            cartLS.set(cart.get());
        });

        cartView.changePagePaginationClickHandler((e: Event, type: string) => {
            cart.changeParamsPage(type);
            cartLS.set(cart.get());
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
            const cartState = cart.get();

            const productWrapper = htmlTarget.closest('.cart-item') as HTMLElement;

            if (productWrapper) {
                const checkbox = productWrapper.querySelector('.checkbox-fake__input') as HTMLInputElement;

                if (checkbox) {
                    const productId = +checkbox.value;

                    const product = cartState.products.find((el) => el.id === productId);

                    if (product) {
                        if (type === 'increase') {
                            cart.increaseProductCount(product);
                        } else {
                            cart.decreaseProductCount(product.id);
                        }

                        cartLS.set(cart.get());
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
                    cart.addPromocode(promo);

                    cartLS.set(cart.get());
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
                        cart.removePromocode(promo);
                        cartLS.set(cart.get());
                    }
                }
            }
        });
    }
}

export default CartController;
