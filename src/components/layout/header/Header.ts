import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

class Header extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    init() {
        return this.render();
    }

    render() {
        return `
            <header>
                <input type="text">
                <button type="button">Поиск</button>
            </header>
        `;
    }
}

export default Header;
