import router from './router/router';
import { MainView } from './view/main-view';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

router();

new MainView().init(document.body);