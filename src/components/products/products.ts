import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";
import { Subscriber } from "../../utils/observer-interface";

export class Products extends Component implements Subscriber {
    private readonly productsModel: ProductsModel;
    constructor(private big: boolean, products: ProductsModel) {
        super({containerTag: 'div', className: 'products d-flex flex-column gap-2'.split(' ')});
        this.productsModel = products;
        this.subscribe(this.productsModel);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class=" flex-grow-1 d-flex gap-2">
            <select name="sort" id="sort">
                <option value="sort-title">Sort</option>
                <option value="price-asc">Sort by price ASC</option>
                <option value="price-desc">Sort by price DESC</option>
                <option value="rating-asc">Sort by rating ASC</option>
                <option value="rating-desc">Sort by rating DESC</option>
            </select>
            <input type="search" placeholder="Search product">
            <div class="view small-view ${!this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                ${this.drawViewIcon(16)}
            </div>
            <div class="view big-view ${this.big ? 'active-view' : ''} d-flex flex-wrap justify-content-around">
                ${this.drawViewIcon(9)}
            </div>
        </div>
        <div id="prods" class="d-flex flex-wrap gap-2"></div>
        `;
        return temp.content;
    }

    private drawProducts(): void {
        const prodsWrapper = this.container.querySelector('#prods');
        if (!prodsWrapper) throw new Error('Products Wrapper not exist');
        prodsWrapper.innerHTML = '';
        this.productsModel.get().forEach((el) => {
            let productItem = document.createElement('div');
            productItem.classList.add('product-item');
            // productItem.style.width = this.big ? '33.33%' : '25%';
            // console.log('productItem.style.width: ', productItem.style.width);
            if (this.big) {
                productItem.classList.add('big-item');
            } else {
                productItem.classList.add('small-item');
            }
            productItem.innerHTML = `
            <img src="${el.thumbnail}" loading="lazy" alt="${el.title}" class="item-img">
            `
            // productItem.innerHTML = `${el.brand}`;
            prodsWrapper.append(productItem);
        })
    }

    private drawViewIcon(size: number) {
        let result = '';
        let tmp = '<div></div>';
        for (let i = 0; i < size; i++) {
            result += tmp;
        }
        return result;
    }

    public setBigScale() {
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

    public setSmallScale() {
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

    public handleBigScaleClick(callback: (e: Event) => void) {
        const bigIcon = this.container.getElementsByClassName('big-view')[0];
        if (bigIcon) {
            bigIcon.addEventListener('click', callback);
        }
    }

    public handleSmallScaleClick(callback: (e: Event) => void) {
        const smallIcon = this.container.getElementsByClassName('small-view')[0];
        if (smallIcon) {
            smallIcon.addEventListener('click', callback);
        }
    }

    public update(): void {
        this.drawProducts();
    }
}