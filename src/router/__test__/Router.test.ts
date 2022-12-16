import Router from '../Router';
import { IRouter, IRouteURL } from '../types/IRouter';
import { IInstanceContext } from '../../utils/context/types/IContext';
import app from '../../__test__/createApp';

const router = new Router();

test('Инициализация роутера', () => {
    router.init({} as IInstanceContext);

    const contextIsCreated = typeof router.context === 'object' && router.context !== null;

    expect(contextIsCreated).toBe(true);
});

test('Редирект', () => {
    const address = router.push({ url: '/product/1', data: {} } as IRouteURL, undefined);

    expect(address).toBe('/product/1');
});

test('Нужный роутер определяется всегда', () => {
    const appRouter = (app.context.$router as IRouter).getCurrentRouter();

    const hasRouter = typeof appRouter === 'object' && appRouter !== null;

    expect(hasRouter).toBe(true);
});
