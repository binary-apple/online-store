const Utils = require("../Utils");

const utils = new Utils();

test("Создание нового DOM Элемента", () => {
    const elem = document.createElement('div');

    expect(utils.replaceItem(elem)).toBe(document.createElement('div'));
})