import Controller from '../Controller';
import testApp from '../../__test__/createApp';
import { IRouter } from '../../router/types/IRouter';

const controller = new Controller();

test('Всегда отображается нужная страница', () => {
    const page = controller.getTemplateSlot((testApp.context.$router as IRouter).currentRouter, testApp.context);

    const hasPage = typeof page === 'object' && page !== null;

    expect(hasPage).toBe(true);
});
