import Controller from '../Controller';
import app from '../../__test__/createApp';
import { IRouter } from '../../router/types/IRouter';

const controller = new Controller();

test('Всегда отображается нужная страница', () => {
    const page = controller.getTemplateSlot((app.context.$router as IRouter).currentRouter);

    const hasPage = typeof page === 'object' && page !== null;

    expect(hasPage).toBe(true);
});
