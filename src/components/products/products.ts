import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";
import { Subscriber } from "../../utils/observer-interface";
import { Cart } from "../../model/cart";
import { products } from "../../model/productItems";

export class Products extends Component implements Subscriber {
    private readonly productsModel: ProductsModel;
    private readonly cart: Cart;
    constructor(private big: boolean, products: ProductsModel, cart: Cart) {
        super({containerTag: 'div', className: 'products col-md-9 col-12 px-md-4'.split(' ')});
        this.productsModel = products;
        this.cart = cart;
        this.subscribe(this.productsModel, this.cart);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class=" flex-grow-1 d-flex align-items-center justify-content-between gap-2 mb-2">
            <select name="sort" id="sort">
                <option value="sort-title">Sort</option>
                <option value="price-asc">Sort by price ASC</option>
                <option value="price-desc">Sort by price DESC</option>
                <option value="rating-asc">Sort by rating ASC</option>
                <option value="rating-desc">Sort by rating DESC</option>
            </select>
            <input type="search" placeholder="Search product">
            <div class="d-flex gap-3">
                <div class="view small-view ${!this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                    ${this.drawViewIcon(false)}
                </div>
                <div class="view big-view ${this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                    ${this.drawViewIcon(true)}
                </div>
            </div>
        </div>
        <div id="prods" class="d-flex flex-wrap gap-2 product-col-${this.big ? 3 : 4 }"></div>
        `;
        return temp.content;
    }

    private drawProducts(): void {
        const prodsWrapper = this.container.querySelector('#prods');
        if (!prodsWrapper) throw new Error('Products Wrapper not exist');
        prodsWrapper.innerHTML = '';
        this.productsModel.get().forEach((el) => {
            let productItem = document.createElement('div');
            productItem.classList.add(...`product-item ${this.cart.isProductInCart(el.id) ? 'in-cart' : ''}`.trim().split(' '));
            productItem.dataset.idproduct=`${el.id}`;
            productItem.innerHTML = `
            <img src="${el.thumbnail}" 
                loading="lazy" 
                alt="${el.title}" 
                class="item-img">
            <div class="product-info mx-1 lh-base">
                <div>${el.title}</div>
                <div>Price: <span class="product-price">${el.price}</span></div>
            </div>
            <button class="products-button ${this.cart.isProductInCart(el.id) ? 'drop' : 'add'}" data-idbutton="${el.id}">
                ${this.cart.isProductInCart(el.id) ? 'Drop from cart' : 'Add to cart'}
            </button>
            `
            prodsWrapper.append(productItem);
        })
    }

    private drawViewIcon(big: boolean = true) {
        if (big) {
            return `
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="6" height="6" stroke="#414141"/>
            <rect x="0.5" y="9.5" width="6" height="6" stroke="#414141"/>
            <rect x="0.5" y="18.5" width="6" height="6" stroke="#414141"/>
            <rect x="9.5" y="0.5" width="6" height="6" stroke="#414141"/>
            <rect x="9.5" y="9.5" width="6" height="6" stroke="#414141"/>
            <rect x="9.5" y="18.5" width="6" height="6" stroke="#414141"/>
            <rect x="18.5" y="0.5" width="6" height="6" stroke="#414141"/>
            <rect x="18.5" y="9.5" width="6" height="6" stroke="#414141"/>
            <rect x="18.5" y="18.5" width="6" height="6" stroke="#414141"/>
            </svg>
            `
        } else {
            return `
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="0.5" y="13.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="0.5" y="7" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="0.5" y="20" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="7" y="0.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="7" y="13.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="7" y="7" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="7" y="20" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="13.5" y="0.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="13.5" y="13.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="13.5" y="7" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="13.5" y="20" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="20" y="0.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="20" y="13.5" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="20" y="7" width="4.5" height="4.5" stroke="#414141"/>
            <rect x="20" y="20" width="4.5" height="4.5" stroke="#414141"/>
            </svg>
            `
        }
    }

    private setBigScale() {
        const bigIcon = this.container.getElementsByClassName('big-view')[0];
        const smallIcon = this.container.getElementsByClassName('small-view')[0];
        if (!bigIcon || !smallIcon) {
            throw new Error('Scale icons not exist');
        }
        if (smallIcon.classList.contains('active-view')) {
            smallIcon.classList.remove('active-view');
        }
        if (!bigIcon.classList.contains('active-view')) {
            bigIcon.classList.add('active-view');
        }
        this.big = true;
    }

    private setSmallScale() {
        const bigIcon = this.container.getElementsByClassName('big-view')[0];
        const smallIcon = this.container.getElementsByClassName('small-view')[0];
        if (!bigIcon || !smallIcon) {
            throw new Error('Scale icons not exist');
        }
        if (!smallIcon.classList.contains('active-view')) {
            smallIcon.classList.add('active-view');
        }
        if (bigIcon.classList.contains('active-view')) {
            bigIcon.classList.remove('active-view');
        }
        this.big = false;
    }

    private _handleScaleClick(iconClass: string, removeClass: string, setClass: string, big: boolean, callback: (big: boolean) => void) {
        const scaleIcon = this.container.getElementsByClassName(iconClass)[0];
        if (scaleIcon) {
            scaleIcon.addEventListener('click', () => {
                const prods = this.container.querySelector('#prods');
                if (prods) {
                    if (prods.classList.contains(removeClass)) {
                        prods.classList.remove(removeClass);
                        prods.classList.add(setClass);
                    }
                }
                if (big) this.setBigScale();
                else this.setSmallScale();
                callback(big);
            });
        }
    }

    public handleScaleClick(callback: (big: boolean) => void) {
        this._handleScaleClick('small-view', 'product-col-3', 'product-col-4', false, callback);
        this._handleScaleClick('big-view', 'product-col-4', 'product-col-3', true, callback);
    }

    private toggleProductInCart(id: number) {
        const product = products.find(e => e.id === id);
        if (! product) {
            throw new Error('No such product');
        }
        this.cart.isProductInCart(id) ? this.cart.removeProductFromCart(id) : this.cart.addProductToCart(product);
    }

    public handleProductClick(callback: (id: number) => void) {
        const prods = this.container.querySelector('#prods');
        if (!prods) {
            throw new Error('No products-wrapper');
        }
        prods.addEventListener('click', (e: Event) => {
            const target = e.target;
            if (!(target instanceof HTMLElement) || !(target)) {
                return;
            }
            const idButton = target.dataset.idbutton;
            if (idButton) {
                this.toggleProductInCart(Number(idButton));
            } else {
                const productEl = target.closest('.product-item');
                if (!(productEl instanceof HTMLElement) || !(productEl)) {
                    return;
                }
                const idProduct = productEl.dataset.idproduct;
                if (idProduct) {
                    callback(Number(idProduct));
                }
            }
        })
    }

    public update(): void {
        this.drawProducts();
    }
}