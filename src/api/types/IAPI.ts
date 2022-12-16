import { IInstanceContext } from '../../utils/context/types/IContext';
import { IProductsAPI } from './IProducts';

export interface IAPI {
    name: string;
    init(context: IInstanceContext): void;
    getProducts(e: MouseEvent | null): Promise<IProductsAPI>;
    context: IInstanceContext;
}

export interface IApiProps {
    context: IInstanceContext | null;
    url: string;
    e: MouseEvent | null;
}
