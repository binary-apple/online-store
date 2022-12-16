import App from '../App';
import Store from '../../store/Store';

const app = new App();
const store = new Store();

test('Модуль добавился в контекст', () => {
    app.use(store);

    expect(app.modules.length).toBe(1);
});

test('Приложение работает', () => {
    const hasContext = typeof app.context === 'object' && app.context !== null;

    expect(hasContext).toBe(true);
});
