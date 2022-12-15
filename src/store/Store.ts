import { IContext } from "../app/types/IApp";
import { IStore } from "./types/IStore";

class Store implements IStore {
    name = '$store';
    context = {} as IContext;
    required = [] as Array<string>;
    
    constructor() {
        this.init = this.init;
    }

    init(context: IContext) {
        this.context = context;
    }
}

export default Store;