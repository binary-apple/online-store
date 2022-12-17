import { IInstanceContext } from '../../../../../utils/context/types/IContext';
import Component from '../../../../Component';

class Range extends Component {
    constructor(context: IInstanceContext) {
        super(context);
    }

    async init() {
        return await this.render();
    }

    render() {
        return `
            <input type="range">
        `;
    }
}

export default Range;
