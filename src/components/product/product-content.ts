import { Component } from '../types/component';

class ProductContent extends Component {
    constructor() {
        super({ containerTag: 'main', className: ['main-container'] });
    }

    protected template() {
        const main = document.createElement('template');

        return main.content;
    }
}

export default ProductContent;
