import { IApiProps } from '../types/IAPI';
import fetch from 'node-fetch';

class Request {
    async get(apiProps: IApiProps) {
        const { url, e } = apiProps;

        if (e) {
            (e.target as HTMLElement).style.pointerEvents = 'none';
        }

        const response = await (await fetch(url, { method: 'GET' })).json();

        if (e) {
            (e.target as HTMLElement).style.pointerEvents = 'all';
        }

        return response;
    }
}

export default Request;
