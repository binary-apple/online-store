import { IInstanceContext } from '../../../utils/context/types/IContext';

export interface IRenderComponent {
    render(): string;
    init(context: IInstanceContext): string | Promise<string>;
}
