import { IContext } from "../../../app/types/IApp";

class Error404 {
    init(context: IContext) {
        return this.render();
    }

    render() {
        return `
            ERORR PAGE
        `
    }
}

export default Error404;
