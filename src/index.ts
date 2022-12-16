import App from './app/App';
import Router from './router/Router';
import Store from './store/Store';
import Listeners from './utils/listeners/Listeners';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = new App();
const store = new Store();
const router = new Router();
const listeners = new Listeners();

app.use(store);
app.use(listeners);
app.use(router);

const root = (document as Document).querySelector('#app');

app.start(root as HTMLElement);
