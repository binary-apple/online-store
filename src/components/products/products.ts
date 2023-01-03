import { Component } from "../types/component";

export class Products extends Component {
    constructor() {
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
            <div class="view small-view d-flex flex-wrap justify-content-around">
                ${this.drawViewIcon(16)}
            </div>
            <div class="view big-view active-view d-flex flex-wrap justify-content-around">
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
    
    public toggleView(e: Event) {
        const className = 'active-view';
        const curTarget = e.currentTarget;
        if (!(curTarget instanceof HTMLElement)) { 
            throw new Error('Wrong type of current target');
        }
        if (curTarget.classList.contains(className)) {
            return;
        } else {
            const otherView = this.container.querySelector(`.${className}`);
            otherView?.classList.remove(className);
            curTarget.classList.add(className);
        }
    }

    public handleViewIconClick(callback: (e: Event) => void) {
        const view = this.container.querySelectorAll('.view');
        if (view) {
            view.forEach(element => {
                element.addEventListener('click', callback);
            });
        }
    }
}