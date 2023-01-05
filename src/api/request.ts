import { RequestSettings } from './types/request';

class Request {
    baseUrl = process.env.API_BASE;

    async make(method: string, path: string, body?: BodyInit) {
        const settings: RequestSettings = {
            method,
        };

        if (body) {
            settings.body = body;
        }

        try {
            const response = await (await fetch(this.baseUrl + path, settings)).json();
            return response;
        } catch (e) {
            throw new Error(`Error on ${method} request: ${path}`);
        }
    }
}

export default Request;
