import { Cart } from '../model/cart';
import { Subscriber } from '../utils/observer-interface';
import { Component } from './types/component';

export class Header extends Component implements Subscriber {
    private readonly cart: Cart;
    constructor(cart: Cart) {
        super({
            containerTag: 'header',
            className: 'header w-100 d-flex align-items-center sticky-top mb-2'.split(' '),
        });
        this.cart = cart;
        this.subscribe(this.cart);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="container w-100 mt-3 mb-3">
            <div class="row d-flex align-items-center justify-content-between">
                <div class="col flex-grow-0">
                    <a href="/" class="logo d-block"></a>
                </div>
                <div class="col flex-grow-0">
                    <div class="shopping-cart d-flex gap-2 align-items-center">
                        <div class="total text-nowrap">
                            Total: <span class="total-amount d-inline-block">${this.cart.getTotalPrice()}</span>
                        </div>
                        <a class="cart d-block position-relative" href="/cart">
                            <div class="purchase-cnt position-absolute lh-1 text-center">${this.cart.getTotalCount()}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
        return temp.content;
    }

    update(): void {
        this.setProdsCount(this.container.querySelector('.purchase-cnt'));
        this.setTotalSum(this.container.querySelector('.total-amount'));
    }

    private setProdsCount(element: HTMLElement | null) {
        if (element) {
            element.innerHTML = `${this.cart.getTotalCount()}`;
        }
    }

    private setTotalSum(element: HTMLElement | null) {
        if (element) {
            element.innerHTML = `${this.cart.getTotalPrice()}`;
        }
    }

    public handleClickToCartIcon(callback: (e: Event) => void) {
        const cart = this.container.querySelector('.cart');
        if (cart) {
            cart.addEventListener('click', function (e) {
                e.preventDefault();
                callback(e);
            });
        }
    }

    public handleClickToLogoIcon(callback: (e: Event) => void) {
        const logo = this.container.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function (e) {
                e.preventDefault();
                callback(e);
            });
        }
    }
}
