import app from '../../../__test__/createApp';

test('Создание контекста', () => {
    const isObject = typeof app.context === 'object' && app.context !== null;

    expect(isObject).toBe(true);
});
