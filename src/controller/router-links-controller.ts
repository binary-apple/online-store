import Router from 'vanilla-router';
import Controller from './controller';

class RouterLinksController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        document.body.addEventListener('click', (e) => {
            const { target } = e;

            const htmlTarget = target as HTMLElement;

            const isRedirect = !htmlTarget.dataset.exception && (htmlTarget.tagName === 'A' || htmlTarget.closest('a'));

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

export default RouterLinksController;
