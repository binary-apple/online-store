import { Component } from '../types/component';
import CartProducts from './cart-products';
import SelectAllProducts from './select-all-products';
import CartTotalBoard from './cart-total-board';
import CartPagination from './cart-pagination';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart/cart';

class CartContent extends Component {
    cart: Cart;
    cartProducts: CartProducts;
    selectAllProducts: SelectAllProducts;
    cartTotal: CartTotalBoard;
    cartPagination: CartPagination;
    products: Array<Product> = [];

    constructor(cart: Cart) {
        super({ containerTag: 'section', className: ['row', 'cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.selectAllProducts = new SelectAllProducts(this.cart);
        this.cartTotal = new CartTotalBoard(this.cart);
        this.cartPagination = new CartPagination(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.templateCart();

        return main.content;
    }

    private templateCart() {
        return `
            <div class="row d-flex cart-content__title">
                <h1 class="col-2 cart-title__text">Cart</h1>
                ${this.cartCounter()}
            </div>
            <div class="row col-9 cart-content__remove-selected d-flex justify-content-between">
                ${this.selectAllProducts.toString()}
                ${this.cartPagination.toString()}
            </div>
            <div class="row cart-content__products">
                <ul class="col-9 cart-products">
                    ${this.cartProducts.toString()}
                </ul>
                <div class="col-3 cart-total">
                    ${this.cartTotal.toString()}
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-confirm-promo">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Apply promocode</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    You really want to confirm the promotional code <b></b>?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn cart-modal__confirm">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        `;
    }

    private cartCounter() {
        const cart = this.cart.get();

        const cartNoEmpty = cart.products.length !== 0;

        return cartNoEmpty ? `<span class="cart-title__cart-counter">${cart.products.length}</span>` : '';
    }

    private update() {
        const counter = document.querySelector('.cart-title__cart-counter');

        if (counter) {
            counter.remove();
            const title = document.querySelector('.cart-content__title');

            if (title) {
                title.insertAdjacentHTML('beforeend', this.cartCounter());
            }
        }
    }
}

export default CartContent;
