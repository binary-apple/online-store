import app from '../../__test__/createApp';
import { IStore } from '../types/IStore';

test('Наличие роутеров', () => {
    const store = app.context.$store as IStore;

    expect(Array.isArray(store.data.routers) && store.data.routers.length > 0).toBe(true);
});
