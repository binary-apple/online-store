import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

class Footer extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    init() {
        return this.render();
    }

    render() {
        return `
            <footer>
                Футер
            </footer>
        `;
    }
}

export default Footer;
