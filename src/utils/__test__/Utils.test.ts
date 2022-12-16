import Utils from '../Utils';

const utils = new Utils();

test('Создание нового DOM Элемента', () => {
    const elem = document.createElement('div');
    const clone = utils.replaceItem(elem);

    expect((clone as Element).tagName === 'DIV').toBe(true);
});

test('Возврат пути сайта без корня', () => {
    const path = 'https://www.site.com/it/path';
    const pathname = utils.getPathName(path);

    expect(pathname).toBe('/it/path');
});
