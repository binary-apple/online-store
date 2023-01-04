import { Component } from "./types/component";

export class Error extends Component{
    constructor() {
        super({containerTag: 'div', className: 'w-100 d-flex align-items-center'.split(' ')});
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="error container w-75 h-50 rounded d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column align-items-center py-5">
                <div class="e404">404</div>
                <div class="e404-text">Oooops... Page not found</div>
            </div>
        </div>
        `;
        return temp.content;
    }
}