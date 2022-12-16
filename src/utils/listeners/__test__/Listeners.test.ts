import Listeners from '../Listeners';

const listeners = new Listeners();

test('Добавлен только один слушатель', () => {
    const handler = () => 'event';

    listeners.onceListener('popstate', handler);
    listeners.onceListener('popstate', handler);

    expect(listeners.listeners.length).toBe(1);
});
