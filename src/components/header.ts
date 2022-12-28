import { Component } from "./types/component";

export class Header extends Component{
    constructor() {
        super({containerTag: 'header', className: 'header w-100 d-flex align-items-center sticky-top mb-2'.split(' ')});
    }

    protected template(): DocumentFragment {
        const temp = document.createElement('template');
        temp.innerHTML = `
        <div class="container w-100 mt-3 mb-3">
            <div class="row d-flex align-items-center justify-content-between">
                <div class="col flex-grow-0">
                    <a href="/" class="logo d-block"></a>
                </div>
                <div class="col flex-grow-0">
                    <div class="shopping-cart d-flex align-items-center">
                        <div class="total text-nowrap">
                            Total: <span class="total-amount d-inline-block">0</span>
                        </div>
                        <a class="cart d-block" href="/cart">
                            <div class="purchase-cnt">0</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
        return temp.content;
    }
}