import { Component } from './types/component';
import BreadCrumbsStore from '../model/breadcrumbs-store';
import { BreadCrumbsNames, IBreadcrumbsNames } from './types/breadcrumbs';
import { Product } from '../model/types/product';

class BreadCrumbs extends Component {
    breadcrumbsStore: BreadCrumbsStore;

    constructor(product?: Product) {
        super({ containerTag: 'nav', className: ['row', 'breadcrumbs'] });

        this.breadcrumbsStore = new BreadCrumbsStore();

        this.breadcrumbsStore.set(product);
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
            <ul class="col-12 d-flex">
                ${breadcrumbsItems.join('')}
            </ul>
        `;
    }

    linksTemplate(item: string, index: number, array: Array<string>) {
        const isLast = index === array.length - 1;
        const isActive = isLast ? ' active' : '';
        const linkText = (BreadCrumbsNames as IBreadcrumbsNames)[item] || item;

        const glue = !isLast ? '<li class="breadcrumbs__item glue">></li>' : '';

        return `
            <li class="breadcrumbs__item">
                ${
                    (BreadCrumbsNames as IBreadcrumbsNames)[item]
                        ? `
                        <a class="breadcrumbs__link${isActive}" href="" data-href="/${item}">${linkText}</a>
                    `
                        : `<span class="breadcrumbs__link${isActive}" href="" data-href="/${item}">${linkText}</span>`
                }
            </li>
            ${glue}
        `;
    }
}

export default BreadCrumbs;
