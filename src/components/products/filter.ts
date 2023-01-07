import { Component } from "../types/component";
import { Filter as FilterModel } from "../../model/products/filter";
import { Publisher, Subscriber } from "../../utils/observer-interface";

export class Filter extends Component implements Subscriber {
    private readonly filterName: string;
    private readonly filterList: Array<string>;
    private readonly filterModel: FilterModel;
    constructor(filterModel: FilterModel, filterName: string, filterList: Array<string>) {
        super({containerTag: 'div', className: ['filter', `filter-${filterName}`]});
        this.filterModel = filterModel;
        this.filterName = filterName;
        this.filterList = filterList;
        this.subscribe(this.filterModel);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="filter-title">${this.filterName}</div>
        <div>${this.drawFilterList()}</div>
        `;
        return temp.content;
    }

    private drawFilterList() {
        const res: Array<string> = [];
        this.filterList.forEach((el) => {
            res.push(`
            <div class="filter-item">
                <input type="checkbox" id="${el}" class="default-check">
                <div class="custom-check"></div>
                <label for="${el}">${el}</label>
                <span class="filtred-cnt">(???)</span>
            </div>
            `);
        })
        return res.join('');
    }

    update(): void {
        console.log('update filters');
    }
}