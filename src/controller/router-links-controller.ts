import { HashRouter } from '../router/router';
import Controller from './controller';

class RouterLinksController extends Controller {
    constructor(router: HashRouter) {
        super(router);
    }

    init() {
        const container = document.querySelector('.main-container');

        if (container) {
            container.addEventListener('click', (e) => {
                const { target } = e;
                const htmlTarget = target as HTMLElement;
                const isRedirect =
                    !htmlTarget.dataset.exception && (htmlTarget.tagName === 'A' || htmlTarget.closest('a'));
                if (isRedirect) {
                    e.preventDefault();
                    const { href } = htmlTarget.tagName === 'A' ? htmlTarget.dataset : htmlTarget.closest('a')!.dataset;
                    if (href) {
                        this.router.navigateTo(href);
                    }
                }
            });
        }
    }
}

export default RouterLinksController;
