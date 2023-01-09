import { Component } from './types/component';
import { BreadCrumb } from './types/breadcrumbs';

class BreadCrumbs extends Component {
    breadcrumbs: Array<BreadCrumb>;

    constructor(data: Array<BreadCrumb>) {
        super({ containerTag: 'nav', className: ['row', 'breadcrumbs'] });
        this.breadcrumbs = data;
    }

    protected template() {
        const main = document.createElement('template');

        if (this.breadcrumbs.length) {
            main.innerHTML = this.breadCrumbsTemplate(this.breadcrumbs);
        }

        return main.content;
    }

    breadCrumbsClickHandler(callback: (e: Event) => void) {
        const breadcrumbs = this.container.querySelector('.breadcrumbs__list');

        if (breadcrumbs) {
            breadcrumbs.addEventListener('click', (e) => {
                callback(e);
            });
        }
    }

    private breadCrumbsTemplate(breadcrumbs: Array<BreadCrumb>) {
        const linksTemplate = this.linksTemplate.bind(this);
        const breadcrumbsItems = breadcrumbs.map(linksTemplate);

        return `
            <ul class="col-12 d-flex breadcrumbs__list">
                ${breadcrumbsItems.join('')}
            </ul>
        `;
    }

    private linksTemplate(item: BreadCrumb, index: number, array: Array<BreadCrumb>) {
        const isLast = index === array.length - 1;
        const isActive = isLast ? 'breadcrumbs__link--active' : '';
        const glue = !isLast ? '<li class="breadcrumbs__item glue">></li>' : '';

        return `
            <li class="breadcrumbs__item">
                ${
                    item.link
                        ? `
                        <a class="breadcrumbs__link ${isActive}" href="" data-href="${item.link}">${item.name}</a>
                    `
                        : `<span class="breadcrumbs__link ${isActive}" href="" data-href="${item.link}">${item.name}</span>`
                }
            </li>
            ${glue}
        `;
    }
}

export default BreadCrumbs;
