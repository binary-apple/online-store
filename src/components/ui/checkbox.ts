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

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        const text = this.checkbox.text ? `<span class="checkbox-fake__text">${this.checkbox.text}</span>` : '';

        return `
            <div class="d-flex checkbox-fake">
                <input class="checkbox-fake__input" value="${this.checkbox.value}" type="checkbox" id="${this.checkbox.id}">
                <label class="d-flex checkbox-fake__label" for="${this.checkbox.id}">
                    <span class="checkbox-fake__checkbox"></span>
                    ${text}
                </label>
            </div>
        `;
    }
}

export default Checkbox;
