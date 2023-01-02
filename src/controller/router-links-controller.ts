import Router from 'vanilla-router';
import Controller from './controller';

class RouterLinksController extends Controller {
    constructor(router: Router) {
        super(router);
    }

    init() {
        const links = document.querySelectorAll('a');

        if (links) {
            links.forEach((element) => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();

                    const { target } = e;

                    const htmlTarget = target as HTMLElement;

                    if (htmlTarget.tagName === 'A') {
                        const { href } = htmlTarget.dataset;

                        if (href) {
                            this.router.navigateTo(href);
                        }
                    }
                });
            });
        }
    }
}

export default RouterLinksController;
