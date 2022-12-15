import { IContext } from "../../../app/types/IApp";

class MainPage {
    init(context: IContext) {
        return this.render();
    }

    render() {
        return `
            <ul>
                <li>
                    <span href="/product/1">product</span>
                </li>
            </ul>
        `
    }
}

export default MainPage;
