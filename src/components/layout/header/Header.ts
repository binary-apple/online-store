import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

import './header.scss';

class Header extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    init() {
        return this.render();
    }

    render() {
        return `
            <header class="header w-100 d-flex align-items-center">
                <div class="container w-100">
                    <div class="row d-flex align-items-center justify-content-between">
                        <div class="col flex-grow-0">
                            <a href="/" class="logo d-block"></a>
                        </div>
                        <div class="col flex-grow-0">
                            <div class="shopping-cart d-flex align-items-center">
                                <div class="total text-nowrap">
                                    Total: <span class="total-amount d-inline-block">0</span>
                                </div>
                                <a class="cart d-block" href="/cart">
                                    <div class="purchase-cnt">0</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

export default Header;
