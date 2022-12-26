import { Component } from "./types/component";

export class Footer extends Component{
    constructor() {
        super('footer', ...'footer w-100 d-flex align-items-center'.split(' '));
    }

    protected template(): DocumentFragment {
        const footer = new DocumentFragment();
        footer.append(`Footer`);
        return footer;
    }
}