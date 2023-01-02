import { Component } from './types/component';
import BreadCrumbsStore from '../model/breadcrumbs-store';

class BreadCrumbs extends Component {
    breadcrumbsStore: BreadCrumbsStore;

    constructor() {
        super({ containerTag: 'nav', className: ['row', 'breadcrumbs'] });

        this.breadcrumbsStore = new BreadCrumbsStore();

        this.subscribe(this.breadcrumbsStore);

        this.breadcrumbsStore.set();
    }

    template() {
        const main = document.createElement('template');
        const breadcrumbs = this.breadcrumbsStore.get();

        if (breadcrumbs.length) {
            main.innerHTML = this.breadCrumbsTemplate(breadcrumbs);
        }

        return main.content;
    }

    breadCrumbsTemplate(breadcrumbs: Array<string>) {
        const linksTemplate = this.linksTemplate.bind(this);
        const breadcrumbsItems = breadcrumbs.map(linksTemplate);

        return `
            <ul class="col-2 d-flex">
                ${breadcrumbsItems.join('')}
            </ul>
        `;
    }

    linksTemplate(item: string, index: number, array: Array<string>) {
        const isLast = index === array.length - 1;
        const isActive = isLast ? ' active' : '';
        const linkText = item === '/' ? 'Main' : item === 'cart' ? 'Cart' : item;
        const glue = !isLast ? '<li class="breadcrumbs__item glue">></li>' : '';

        return `
            <li class="breadcrumbs__item">
                <a class="breadcrumbs__link${isActive}" href="" data-href="/${item}">${linkText}</a>
            </li>
            ${glue}
        `;
    }

    update() {
        const breadcrumbsContainer = document.querySelector('.breadcrumbs');

        if (breadcrumbsContainer) {
            breadcrumbsContainer.innerHTML = '';
            this.template();
        }
    }
}

export default BreadCrumbs;
