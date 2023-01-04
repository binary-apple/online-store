import CartFacade from '../../../model/cart/cart-facade';

class CartPagination {
    cart: CartFacade;

    constructor(cart: CartFacade) {
        this.cart = cart;
    }

    init() {
        this.limit();
        this.page();
    }

    limit() {
        const limitInput = document.querySelector('.cart-pagination__value');

        if (limitInput) {
            const changeLimit = this.changeLimit.bind(this);
            limitInput.addEventListener('change', changeLimit);
            limitInput.addEventListener('keyup', changeLimit);
        }
    }

    changeLimit(e: Event) {
        const htmlTarget = e.target as HTMLInputElement;

        if (!htmlTarget.value) {
            return;
        }

        if (+htmlTarget.value < 1) {
            htmlTarget.value = '1';
        }

        const pagination = this.cart.pagination;
        pagination.limit = +htmlTarget.value;
        pagination.newPage = pagination.page;

        this.cart.setPagination(pagination);
    }

    page() {
        const nav = document.querySelector('.cart-pagination__nav');

        if (nav) {
            const changePage = this.changePage.bind(this);
            nav.addEventListener('click', changePage);
        }
    }

    changePage(e: Event) {
        const htmlTarget = e.target as HTMLElement;

        const isPageUp = htmlTarget.classList.contains('cart-pagination__forward');

        if (isPageUp) {
            const pagination = this.cart.pagination;
            pagination.newPage = pagination.page + 1;
            this.cart.setPagination(pagination);
        }

        const isPageDown = htmlTarget.classList.contains('cart-pagination__back');

        if (isPageDown) {
            const pagination = this.cart.pagination;
            pagination.newPage = pagination.page - 1;
            this.cart.setPagination(pagination);
        }
    }
}

export default CartPagination;
