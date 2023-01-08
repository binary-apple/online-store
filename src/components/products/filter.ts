import { Component } from "../types/component";
import { Filter as FilterModel } from "../../model/products/filter";
import { Subscriber } from "../../utils/observer-interface";
import { FilterMetric } from "../../model/types/filter";

export class Filter extends Component implements Subscriber {
    private readonly filterName: string;
    private readonly filterMetric: FilterMetric;
    private readonly filterModel: FilterModel;
    constructor(filterModel: FilterModel, filterName: string, filterMetric: FilterMetric) {
        super({containerTag: 'div', className: ['filter', `filter-${filterName}`]});
        this.filterModel = filterModel;
        this.filterName = filterName.toLowerCase();
        this.filterMetric = filterMetric;
        this.subscribe(this.filterModel);
    }

    protected template(): HTMLElement {
        const temp = document.createElement('div');
        temp.innerHTML = `
        <div class="filter-title">${this.filterName.replace(new RegExp(/(^\w{1})/), this.filterName[0].toUpperCase())}</div>
        <div class="filter-options p-1">${this.drawFilterList()}</div>
        `;
        return temp;
    }

    private drawFilterList() {
        const res: Array<string> = [];
        for (const key in this.filterMetric) {
            this.filterMetric[key] 
            res.push(`
            <div class="filter-item" data-options="${key}">
                <input type="checkbox" id="${key}" class="default-check">
                <div class="custom-check"></div>
                <label for="${key}">${key}</label>
                <span class="filtred-cnt">(${this.filterMetric[key].available}/${this.filterMetric[key].total})</span>
            </div>
            `);
        }
        return res.join('');
    }

    public handleFilterClick(callback: (filterName: string, value: string, inFilter: boolean) => void) {
        const filterOptions = this.container.querySelector('.filter-options');
        if (!filterOptions) throw new Error('No filter items');
        filterOptions.addEventListener('click', (e: Event) => {
            const target = e.target;

            if (target instanceof HTMLInputElement) {
                callback(this.filterName, target.id, target.checked);
            }
        })
    }

    private setFilter(): void {
        const filterOptions = this.container.querySelectorAll('.filter-item');
        filterOptions.forEach((el) => {
            const checkbox = el.querySelector('input');
            if (checkbox instanceof HTMLInputElement && el instanceof HTMLElement) {
                const options = el.dataset.options;

                checkbox.checked = this.filterModel.get()[`${this.filterName === 'brand' ? 'brands' : 'categories'}`].includes(options!);
            }
        })
    }

    update(): void {
        this.setFilter();
    }
}