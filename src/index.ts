import App from './app/App'
import Router from './router/Router';
import Store from './store/Store';
import routers from './router/appRouters';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = new App();
const store = new Store();
const router = new Router(routers);

app.use(store);
app.use(router);

const root = (document as Document).querySelector('#app');

app.start(root as HTMLElement);
