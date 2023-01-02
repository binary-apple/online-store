import { Component } from '../types/component';
import { ICheckbox } from '../types/checkbox';

class Checkbox extends Component {
    checkbox: ICheckbox;

    constructor(checkbox: ICheckbox) {
        super({ containerTag: 'div', className: ['d-flex', 'checkbox-fake'] });

        this.checkbox = checkbox;
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getCheckboxTemplate(this.checkbox);

        return main.content;
    }

    public toString() {
        return `
            <div class="d-flex checkbox-fake">
                ${this.getCheckboxTemplate(this.checkbox)}
            </div>
        `;
    }

    getCheckboxTemplate(checkbox: ICheckbox) {
        const text = checkbox.text ? `<span class="checkbox-fake__text">${checkbox.text}</span>` : '';

        return `
            <input class="checkbox-fake__input" value="${checkbox.value}" type="checkbox" id="${checkbox.id}">
            <label class="d-flex checkbox-fake__label" for="${checkbox.id}">
                <span class="checkbox-fake__checkbox"></span>
                ${text}
            </label>
        `;
    }
}

export default Checkbox;
