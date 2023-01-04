import { Component } from '../types/component';

class Order extends Component {
    constructor() {
        super({ containerTag: 'div', className: ['order'] });
    }

    protected template() {
        const main = document.createElement('template');

        return main.content;
    }
}

export default Order;
