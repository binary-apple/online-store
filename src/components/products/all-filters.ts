import { Component } from "../types/component";
import { Products as ProductsModel } from "../../model/products/products";
import { Filter as FilterModel } from "../../model/products/filter";
import { Filter } from './filter';
import { Slider } from "./slider";

export class AllFilters extends Component {
    private readonly categoryFilter;
    private readonly brandFilter;
    private readonly priceSlider;
    private readonly stockSlider;
    constructor(productsModel: ProductsModel, filterModel: FilterModel) {
        super({containerTag: 'div', className: 'all-filters d-flex flex-wrap col-lg-3 col-12 mb-3'.split(' ')});
        const filterMetrics = productsModel.getMetrics();
        this.categoryFilter = new Filter(productsModel, filterModel, 'category', filterMetrics.categories);
        this.brandFilter = new Filter(productsModel, filterModel, 'brand', filterMetrics.brands);
        this.priceSlider = new Slider(productsModel, filterModel, 'price');
        this.stockSlider = new Slider(productsModel, filterModel, 'stock');
    }

    protected template(): DocumentFragment | HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(...'d-flex flex-wrap w-100'.split(' '));
        wrapper.append(this.defineButtons());
        wrapper.append(this.defineFilterWrapper(this.categoryFilter.render()));
        wrapper.append(this.defineFilterWrapper(this.brandFilter.render()));
        wrapper.append(this.defineSliders());

        return wrapper;
    }

    private defineButtons(): HTMLElement {
        const buttons = document.createElement('div');
        buttons.classList.add(...'filter-buttons col-lg-12 col-md-2 col-12 my-1 flex-wrap'.split(' '));
        buttons.innerHTML = `
        <div class="col-lg-6 col-12 px-1">
            <button class="reset-filters">Reset filters</button>
        </div>
        <div class="col-lg-6 col-12 px-1">
            <button class="copy-link">Copy link</button>
        </div>
        `;
        return buttons;
    }

    private defineSliders(): HTMLElement {
        const sliders = document.createElement('div');
        sliders.classList.add(...'sliders col-lg-12 col-md-2 col-12 my-1 px-2'.split(' '));
        sliders.append(this.priceSlider.render());
        sliders.append(this.stockSlider.render());
        return sliders;
    }

    private defineFilterWrapper(filter: HTMLElement): HTMLElement {
        const filterWrapper = document.createElement('div');
        filterWrapper.classList.add(...'col-lg-12 col-md-4 col-12 my-1 px-1'.split(' '));
        filterWrapper.append(filter);
        return filterWrapper;
    }

    public handleFilterClick(callback: (filterName: string, value: string, inFilter: boolean) => void) {
        this.brandFilter.handleFilterClick(callback);
        this.categoryFilter.handleFilterClick(callback);
    }

    public handleSlidersInput(callback: (sliderName: 'price' | 'stock', minValue: number, maxValue: number)=>void) {
        this.priceSlider.handleSlidersInput(callback);
        this.stockSlider.handleSlidersInput(callback);
    }

    public handleResizeWindow() {
        this.priceSlider.handleResizeWindow();
        this.stockSlider.handleResizeWindow();
    }
    
}