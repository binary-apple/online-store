import { IRouter } from "../router/types/IRouter";
import { IStore } from "../store/types/IStore";
import { IApp, IContext } from "./types/IApp";

class App implements IApp {
    modules = [] as Array<IRouter | IStore>;

    use(module: IRouter | IStore) {
        const moduleItem = {...module};

        this.modules.push(moduleItem);
    }

    async start(root: HTMLElement) {
        const context = {} as IContext;

        this.modules.map((item) => context[item.name] = {...item})
        context.root = root;

        this.modules.forEach((item) => item.init(context));
    }
}

export default App;
