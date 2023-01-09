import { Component } from "./types/component";

export class Footer extends Component{
    constructor() {
        super({containerTag: 'footer', className: 'footer w-100 d-flex align-items-center'.split(' ')});
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="container w-100">
            <div class="row d-flex align-items-center justify-content-between gy-3">
                <div class="col flex-grow-0">
                    <div class="d-flex align-items-center">
                        <div class="github-logo"></div>
                        <div class="github-text text-nowrap">2022 by </div>
                        <div class="github-text text-nowrap lh-base">
                            <a href="https://github.com/nepo92" class="d-block">nepo92</a>
                            <a href="https://github.com/binary-apple" class="d-block">binary-apple</a>
                        </div>
                    </div>
                </div>
                <div class="col flex-grow-0">
                    <a href="https://rs.school/js/" class="rsschool d-block"></a>
                </div>
            </div>
        </div>
        `;
        return temp.content;
    }
}