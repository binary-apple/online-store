import { Component } from "../types/component";

export class Products extends Component {
    constructor(private big: boolean) {
        super({containerTag: 'div', className: 'products flex-grow-1 d-flex gap-2'.split(' ')});
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
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
        `;
        return temp.content;
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
}