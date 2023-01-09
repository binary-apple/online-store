import { Component } from './types/component';

export class Content extends Component {
    constructor() {
        super({ containerTag: 'main', className: ['row', 'main-container'] });
    }

    protected template(): DocumentFragment {
        const main = document.createElement('template');

        return main.content;
    }
}
