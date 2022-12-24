import { RequestSettings } from './types/request';

class Request {
    async make(method: string, url: string, body?: BodyInit) {
        const settings: RequestSettings = {
            method,
        };

        if (body) {
            settings.body = body;
        }

        try {
            const response = await (await fetch(url, settings)).json();
            return response;
        } catch (e) {
            throw new Error(`Error on ${method} request: ${url}`);
        }
    }
}

export default Request;
