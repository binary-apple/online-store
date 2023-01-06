class BaseView {
    root: HTMLElement;
    container: HTMLElement;

    constructor() {
        this.root = document.querySelector('#app') as HTMLElement;
        this.root.innerHTML = '';
        this.container = document.createElement('main');
        this.container.classList.add(...['row', 'main-container']);
    }
}

export default BaseView;
