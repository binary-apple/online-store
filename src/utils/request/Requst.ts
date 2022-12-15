import { IContext } from "../../app/types/IApp";
import { IRouter } from "../../router/types/IRouter";

class Request {
    async get(context: IContext, url: string) {
        const controller = new AbortController();
        const { signal } = controller;

        (context.$router as IRouter).fetchList.push(controller);

        return await (await fetch(url, { signal })).json();
    }
}

export default Request;
