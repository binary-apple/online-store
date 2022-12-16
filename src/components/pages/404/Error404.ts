import { IInstanceContext } from '../../../utils/context/types/IContext';

class Error404 {
    init(context: IInstanceContext) {
        return this.render();
    }

    render() {
        return `
            ERORR PAGE
        `;
    }
}

export default Error404;
