import { IAppModule } from '../../app/types/IApp';
import { IContext, IInstanceContext } from './types/IContext';

class Context implements IContext {
    create(modules: Array<IAppModule>, root: HTMLElement) {
        const context = {} as IInstanceContext;

        modules.forEach((item) => ((context[item.name] as IAppModule) = { ...item }));
        context.root = root;

        return context;
    }
}

export default Context;
