import { Component } from "./types/component";

export class Content extends Component{
    protected template(): HTMLElement {
        const content = document.createElement('div');
        content.innerHTML = `Product Content`;
        return content;
    }
}