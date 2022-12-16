import { IInstanceContext } from '../context/types/IContext';
import { IListeners } from './types/IListeners';

class Listeners implements IListeners {
    name = '$listeners';
    listeners = [] as Array<string>;
    context = {} as IInstanceContext;

    constructor() {
        this.init = this.init;
        this.onceListener = this.onceListener;
    }

    init(context: IInstanceContext) {
        this.context = context;
    }

    onceListener(event: string, handler: () => void) {
        if (!this.listeners.includes(event)) {
            this.listeners.push(event);
            window.addEventListener(event, handler);
        }
    }
}

export default Listeners;
