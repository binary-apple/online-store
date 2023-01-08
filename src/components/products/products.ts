import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";
import { Filter as FilterModel } from "../../model/products/filter";
import { Subscriber } from "../../utils/observer-interface";
import { Cart } from "../../model/cart";
import { products } from "../../model/productItems";
import CartLocalStorage from "../../model/cart-local-storage";

export class Products extends Component implements Subscriber {
    private readonly productsModel: ProductsModel;
    private readonly filterModel: FilterModel;
    private readonly cart: Cart;
    private readonly cartLS: CartLocalStorage;
    constructor(private big: boolean, products: ProductsModel, filterModel: FilterModel, cart: Cart, cartLS: CartLocalStorage) {
        super({containerTag: 'div', className: 'products col-lg-9 col-12 px-md-4'.split(' ')});
        this.productsModel = products;
        this.filterModel = filterModel;
        this.cart = cart;
        this.cartLS = cartLS;        
        this.subscribe(this.productsModel, this.filterModel, this.cart);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="found w-50">
                Found: <span class="found-cnt"></span>
            </div>
            <input type="search" placeholder="Search product" class="search-input w-100">
        </div>
        <div class=" flex-grow-1 d-flex align-items-center justify-content-between gap-2 mb-2">
            <select name="sort" id="sort" class="sort">
                <option value="sort-title">Sort</option>
                <option value="price-asc">Sort by price ASC</option>
                <option value="price-desc">Sort by price DESC</option>
                <option value="rating-asc">Sort by rating ASC</option>
                <option value="rating-desc">Sort by rating DESC</option>
            </select>
            
            <div class="d-flex gap-3 justify-content-end">
                <div class="view small-view ${!this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                    ${this.drawViewIcon(false)}
                </div>
                <div class="view big-view ${this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                    ${this.drawViewIcon(true)}
                </div>
            </div>
        </div>
        <div id="prods" class="d-flex flex-wrap"></div>
        `;
        return temp.content;
    }

    private drawProducts(): void {
        const prodsWrapper = this.container.querySelector('#prods');
        if (!prodsWrapper) throw new Error('Products Wrapper not exist');
        prodsWrapper.innerHTML = '';
        const prods = this.productsModel.get();
        if (prods.length === 0) {
            const noProdsItem = document.createElement('h4');
            noProdsItem.classList.add(...'mx-auto my-4 h3'.split(' '));
            noProdsItem.innerHTML = `No products found :(`;
            prodsWrapper.append(noProdsItem);
            return;
        }
        prods.forEach((el) => {
            const productItem = document.createElement('div');
            productItem.classList.add(...`${this.big ? 'big-scale col-12' : 'small-scale col-md-4 col-6'} py-2 px-1`.trim().split(' '));
            productItem.innerHTML =`
            <a href='/product/${el.id}' class="product-item px-2 ${this.cart.isProductInCart(el.id) ? 'in-cart' : ''}" data-idproduct=${el.id}>
                <div class="item-img-wrapper">
                    <img src="${el.thumbnail}" 
                    loading="lazy" 
                    alt="${el.title}" 
                    class="item-img">
                </div>
                <div class="product-item-wrapper">
                    <div class="product-info mx-2 lh-base">
                        <div class="product-title">${el.title}</div>
                        <div class="product-description">${el.description}</div>
                        <div class="product-price">${el.price}</div>
                    </div>
                    <button class="products-button ${this.cart.isProductInCart(el.id) ? 'drop' : 'add'}" data-idbutton="${el.id}">
                        ${this.cart.isProductInCart(el.id) ? 'Remove' : 'To cart'}
                    </button>
                </div>
            </div>
            `
            prodsWrapper.append(productItem);
        })
    }

    private drawViewIcon(big: boolean) {
        if (!big) {
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
            <rect x="0.5" y="0.5" width="24" height="6" stroke="#414141"/>
            <rect x="0.5" y="9.5" width="24" height="6" stroke="#414141"/>
            <rect x="0.5" y="18.5" width="24" height="6" stroke="#414141"/>
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

    private _handleScaleClick(iconClass: string, removeClasses: Array<string>, setClasses: Array<string>, big: boolean, callback: (big: boolean) => void) {
        const scaleIcon = this.container.getElementsByClassName(iconClass)[0];
        if (scaleIcon) {
            scaleIcon.addEventListener('click', () => {
                const prods = this.container.querySelector('#prods');
                if (prods && prods.childNodes) {
                    prods.childNodes.forEach((el) => {
                        if (el instanceof HTMLElement) {
                            removeClasses.forEach((elClass) => {
                                if (el.classList.contains(elClass)) el.classList.remove(elClass);
                            })
                            setClasses.forEach((elClass) => {
                                el.classList.add(elClass);
                            })
                        }
                    })
                }
                if (big) this.setBigScale();
                else this.setSmallScale();
                callback(big);
            });
        }
    }

    public handleScaleClick(callback: (big: boolean) => void) {
        const bigScaleClasses = ['big-scale','col-12'];
        const smallScaleClasses = ['small-scale', 'col-md-4', 'col-6'];
        this._handleScaleClick('small-view', bigScaleClasses, smallScaleClasses, false, callback);
        this._handleScaleClick('big-view', smallScaleClasses, bigScaleClasses, true, callback);
    }

    private toggleProductInCart(id: number) {
        const product = products.find(e => e.id === id);
        if (! product) {
            throw new Error('No such product');
        }
        this.cart.isProductInCart(id) ? this.cart.removeProductFromCart(id) : this.cart.addProductToCart(product);
        this.cartLS.set(this.cart.get());
    }

    public handleProductClick(callback: (id: number) => void) {
        const prods = this.container.querySelector('#prods');
        if (!prods) {
            throw new Error('No products-wrapper');
        }
        prods.addEventListener('click', (e: Event) => {
            e.preventDefault();
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

    private setFoundCount() {
        const foundEl = this.container.querySelector('.found-cnt');
        if (!foundEl) return;
        foundEl.innerHTML = `${this.productsModel.get().length}`;
    }

    public handleSearchInput(callback: (value: string) => void) {
        const search = this.container.querySelector('.search-input');
        if (!search || !(search instanceof HTMLInputElement)) throw new Error('No searching form');
        search.addEventListener('input', () => {
            callback(search.value);
        })
    }

    public handleSortInput(callback: (value: string) => void) {
        const sort = this.container.querySelector('#sort');
        if (!sort || !(sort instanceof HTMLSelectElement)) throw new Error('No sorting form');
        sort.addEventListener('input', () => {
            callback(sort.value);
        })
    }

    private setSearch() {
        const search = this.container.querySelector('.search-input');
        if (!search || !(search instanceof HTMLInputElement)) throw new Error('No searching form');
        search.value = this.filterModel.get().search;
    }

    private setSort() {
        const sort = this.container.querySelector('#sort');
        if (!sort || !(sort instanceof HTMLSelectElement)) throw new Error('No sorting form');
        if (this.filterModel.get().sort.value === '' || this.filterModel.get().sort.order === '') {
            sort.value = `sort-title`;
        } else {
            sort.value = `${this.filterModel.get().sort.value}-${this.filterModel.get().sort.order}`;
        } 
    }

    public update(): void {
        this.drawProducts();
        this.setFoundCount();
        this.setSearch();
        this.setSort();
    }
}