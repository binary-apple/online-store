import { IInstanceContext } from '../../../utils/context/types/IContext';
import Component from '../../Component';

class Error404 extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    init() {
        return this.render();
    }

    render() {
        return `
            ERORR PAGE
        `;
    }
}

export default Error404;
