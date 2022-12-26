import { Component } from "./types/component";

export class Content extends Component{
    constructor() {
        super('main');
    }

    protected template(): DocumentFragment {
        const main = new DocumentFragment();
        main.append(`Main`);
        return main;
    }
}