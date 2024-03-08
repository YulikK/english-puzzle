import '../node_modules/modern-normalize/modern-normalize.css';
import './app.scss';
import { StartPage } from './app/pages/start/start-page';

const body = document.body;
new StartPage(body);
