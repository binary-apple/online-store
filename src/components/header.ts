import { Component } from "./types/component";

export class Header extends Component{
    constructor() {
        super('header');
    }

    protected template(): DocumentFragment {
        const header = new DocumentFragment();
        header.append(`Header`);
        return header;
    }
}