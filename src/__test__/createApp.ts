import App from '../app/App';
import Router from '../router/Router';
import Listeners from '../utils/listeners/Listeners';
import Store from '../store/Store';

const testApp = new App();
const store = new Store();
const listeners = new Listeners();
const router = new Router();

testApp.use(store);
testApp.use(listeners);
testApp.use(router);

testApp.start(document.createElement('div'));

export default testApp;
