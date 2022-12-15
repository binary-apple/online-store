import { IContext } from "../../../app/types/IApp";

class MainPage {
    init(context: IContext) {
        return this.render();
    }

    render() {
        return `
            MAIN PAGE
        `
    }
}

export default MainPage;
