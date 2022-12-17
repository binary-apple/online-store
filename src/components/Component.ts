import { IInstanceContext } from '../utils/context/types/IContext';

class Component {
    context = {} as IInstanceContext;

    constructor(context: IInstanceContext) {
        this.context = context;
    }
}

export default Component;
