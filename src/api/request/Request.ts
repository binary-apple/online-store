import { IApiProps } from '../types/IAPI';
import fetch from 'node-fetch';
import { IInstanceContext } from '../../utils/context/types/IContext';
import Listeners from '../../utils/listeners/Listeners';

const listeners = new Listeners();

class Request {
    fetchList = [] as Array<AbortController>;

    constructor() {
        const handler = this.cancelNavigation.bind(this);

        listeners.onceListener('cancel-navigation', handler);
    }

    async cancelNavigation() {
        if (this.fetchList.length) {
            const cancel = async () => {
                for (let i = 0; i < this.fetchList.length; i++) {
                    const current = this.fetchList[i];
                    try {
                        await current.abort();
                    } catch (e) {}
                }
            };
            await cancel();
            this.fetchList.length = 0;
        }
    }

    async get(context: IInstanceContext, apiProps: IApiProps) {
        const controller = new AbortController();
        const { signal } = controller;
        const { url, e } = apiProps;

        context.isLoading = true;

        if (e) {
            (e.target as HTMLElement).style.pointerEvents = 'none';
        }

        this.fetchList.push(controller);

        const response = await (await fetch(url, { signal, method: 'GET' } as object)).json();

        context.isLoading = false;

        if (e) {
            (e.target as HTMLElement).style.pointerEvents = 'all';
        }

        return response;
    }
}

export default Request;
