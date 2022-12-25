import { Component } from "./types/component";

export class Header extends Component{
    protected template(): HTMLElement {
        const header = document.createElement('div');
        header.innerHTML = `Header`;
        return header;
    }
}