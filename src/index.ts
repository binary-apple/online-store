import App from './app/App';
import Router from './router/Router';
import Store from './store/Store';
import Listeners from './utils/listeners/Listeners';
import API from './api/api';

import 'bootstrap/dist/css/bootstrap.min.css';

import './style.scss';

const app = new App();
const store = new Store();
const router = new Router();
const listeners = new Listeners();
const api = new API();

app.use(store);
app.use(listeners);
app.use(router);
app.use(api);

const root = (document as Document).querySelector('#app');

app.start(root as HTMLElement);
