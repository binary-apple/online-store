import { Component } from "./types/component";

export class Footer extends Component{
    protected template(): HTMLElement {
        const footer = document.createElement('div');
        footer.innerHTML = `Footer`;
        return footer;
    }
}