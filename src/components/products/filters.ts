import { Component } from "../types/component";

export class Filter extends Component {
    private readonly filterName: string;
    private readonly filterList: Array<string>;
    constructor(filterName: string, filterList: Array<string>) {
        super({containerTag: 'div', className: ['filter']});
        this.filterName = filterName;
        this.filterList = filterList;
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


}