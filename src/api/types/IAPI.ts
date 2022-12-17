import { IInstanceContext } from '../../utils/context/types/IContext';
import { IProductsAPI } from './IProducts';

export interface IAPI {
    name: string;
    init(context: IInstanceContext): void;
    getProducts(context: IInstanceContext, e?: MouseEvent | undefined): Promise<IProductsAPI>;
    context: IInstanceContext;
}

export interface IApiProps {
    context: IInstanceContext | null;
    url: string;
    e: MouseEvent | undefined;
}
