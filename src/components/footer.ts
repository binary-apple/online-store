import { Component } from "./types/component";

export class Footer extends Component{
    constructor() {
        super({containerTag: 'footer', className: 'footer w-100 d-flex align-items-center'.split(' ')});
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `<div>Footer</div>`;
        return temp.content;
    }
}