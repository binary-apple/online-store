import { Component } from "./types/component";

export class Content extends Component{
    constructor() {
        super({containerTag: 'main'});
    }

    protected template(): DocumentFragment {
        const main = new DocumentFragment();
        main.append(`Main`);
        return main;
    }
}