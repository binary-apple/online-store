import { IInstanceContext } from '../context/types/IContext';
import { IRouter } from '../../router/types/IRouter';
import fetch from 'node-fetch';

class Request {
    async get(context: IInstanceContext | null, url: string) {
        const controller = new AbortController();
        const { signal } = controller;

        if (context) {
            (context.$router as IRouter).fetchList.push(controller);
        }

        return await (await fetch(url, { signal } as object)).json();
    }
}

export default Request;
