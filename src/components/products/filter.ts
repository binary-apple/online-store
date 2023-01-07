import { Component } from "../types/component";
import { Filter as FilterModel } from "../../model/products/filter";
import { Publisher, Subscriber } from "../../utils/observer-interface";
import { FilterMetric } from "../../model/types/filter";

export class Filter extends Component implements Subscriber {
    private readonly filterName: string;
    private readonly filterMetric: FilterMetric;
    private readonly filterModel: FilterModel;
    constructor(filterModel: FilterModel, filterName: string, filterMetric: FilterMetric) {
        super({containerTag: 'div', className: ['filter', `filter-${filterName}`]});
        this.filterModel = filterModel;
        this.filterName = filterName;
        this.filterMetric = filterMetric;
        this.subscribe(this.filterModel);
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="filter-title">${this.filterName.replace(new RegExp(/(^\w{1})/), this.filterName[0].toUpperCase())}</div>
        <div class="p-1">${this.drawFilterList()}</div>
        `;
        return temp.content;
    }

    private drawFilterList() {
        const res: Array<string> = [];
        for (let key in this.filterMetric) {
            this.filterMetric[key] 
            res.push(`
            <div class="filter-item">
                <input type="checkbox" id="${key}" class="default-check">
                <div class="custom-check"></div>
                <label for="${key}">${key}</label>
                <span class="filtred-cnt">(${this.filterMetric[key].available}/${this.filterMetric[key].total})</span>
            </div>
            `);
        }
        return res.join('');
    }

    update(): void {
        console.log('update filters');
    }
}