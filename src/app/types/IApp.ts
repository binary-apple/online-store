import { IInstanceContext } from '../../utils/context/types/IContext';

export interface IApp {
    start(root: HTMLElement): void;
}

export interface IAppModule {
    init(context: IInstanceContext): void;
    name: string;
}
