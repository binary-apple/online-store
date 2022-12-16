import { IInstanceContext } from '../../context/types/IContext';

export interface IListeners {
    name: string;
    init(context: IInstanceContext): void;
    onceListener(event: string, handler: () => void): void;
}
