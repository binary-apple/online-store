import Router from 'vanilla-router';
import Controller from './controller';

class ConfirmController extends Controller {
    apply: () => void;

    constructor(router: Router, apply: () => void) {
        super(router);

        this.apply = apply;
    }

    init() {
        const openConfirm = this.openConfirm.bind(this);
        const closeConfirm = this.closeConfirm.bind(this);
        const applyConfirm = this.apply.bind(this);

        window.removeEventListener('open-confirm', openConfirm);
        window.addEventListener('open-confirm', openConfirm);

        window.removeEventListener('close-confirm', closeConfirm);
        window.addEventListener('close-confirm', closeConfirm);

        window.removeEventListener('apply-confirm', applyConfirm);
        window.addEventListener('apply-confirm', applyConfirm);
    }

    openConfirm() {
        const confirm = document.querySelector('.confirm');

        if (confirm) {
            confirm.addEventListener('click', (e) => {
                const t = e.target as HTMLElement;

                const isClose =
                    t.classList.contains('confirm__close') ||
                    t.classList.contains('confirm__cancel') ||
                    t.classList.contains('confirm');

                if (isClose) {
                    const event = new Event('close-confirm');
                    dispatchEvent(event);
                }

                const isApply = t.classList.contains('confirm__apply');

                if (isApply) {
                    const event = new Event('apply-confirm');
                    dispatchEvent(event);
                }
            });
        }
    }

    closeConfirm() {
        const confirm = document.querySelector('.confirm');

        if (confirm) {
            confirm.remove();
        }
    }
}

export default ConfirmController;
