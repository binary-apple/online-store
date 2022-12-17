import { IInstanceContext } from '../../../utils/context/types/IContext';
import { IApiProps } from '../../types/IAPI';
import { IProductsAPI } from '../../types/IProducts';

export interface IRequest {
    get(context: IInstanceContext, apiProps: IApiProps): Promise<IProductsAPI>;
    fetchList: Array<AbortController>;
}
