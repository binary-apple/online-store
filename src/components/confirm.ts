import { Component } from './types/component';

class Confirm extends Component {
    text: string;

    constructor(text: string) {
        super({ containerTag: 'div', className: ['confirm'] });

        this.text = text;
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.confirmTemplate();

        return main.content;
    }

    confirmTemplate() {
        return `
            <div class="confirm__window">
                <span class="confirm__close"></span>
                <p>${this.text}</p>
                <div class="confirm__nav d-flex justify-content-end">
                    <button class="confirm__cancel" type="button">Cancel</button>
                    <button class="confirm__apply" type="button">Apply</button>
                </div>
            </div>
        `;
    }

    open() {
        const modal = document.createElement('div');
        modal.classList.add('confirm');
        modal.innerHTML = this.confirmTemplate();

        document.body.append(modal);

        const confirm = document.querySelector('.confirm');

        if (confirm) {
            setTimeout(() => {
                confirm.classList.add('show');

                const openConfirm = new Event('open-confirm');

                dispatchEvent(openConfirm);
            });
        }
    }
}

export default Confirm;
