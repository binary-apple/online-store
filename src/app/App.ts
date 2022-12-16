import { IRouter } from '../router/types/IRouter';
import { IStore } from '../store/types/IStore';
import { IListeners } from '../utils/listeners/types/IListeners';
import { IApp } from './types/IApp';
import Context from '../utils/context/Context';
import { IInstanceContext } from '../utils/context/types/IContext';

const context = new Context();

class App implements IApp {
    modules = [] as Array<IRouter | IStore | IListeners>;
    context = {} as IInstanceContext;

    use(module: IRouter | IStore | IListeners) {
        const moduleItem = { ...module };

        this.modules.push(moduleItem);
    }

    async start(root: HTMLElement) {
        const instanceContext = context.create(this.modules, root);

        this.modules.forEach((item) => item.init(instanceContext));

        this.context = instanceContext;
    }
}

export default App;
