import { IApp, IAppModule } from './types/IApp';
import Context from '../utils/context/Context';
import { IInstanceContext } from '../utils/context/types/IContext';

const context = new Context();

class App implements IApp {
    modules = [] as Array<IAppModule>;
    context = {} as IInstanceContext;

    use(module: IAppModule) {
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
