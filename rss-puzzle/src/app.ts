import '../node_modules/modern-normalize/modern-normalize.css';
import './app.scss';
import { StartPage } from './app/pages/start/start-page';
import { Game } from './app/pages/game/game';
import Store from "@/app/API/store";
import User from "@/app/Entities/user";
import Options from './app/Entities/options';

const body = document.body;
const store = new Store();
const user = new User(store);
const options = new Options(store)
const gamePage = new Game(body, options, logout);
const startPage = new StartPage(body, user, startGame, logout);

function logout(): void {
  clearUser();
  clearContainer();
  startPage.showAuth();
}

function clearUser() {
  store.removeUser();
  user.clear();
}

function clearContainer() {
  body.innerHTML = '';
  startPage.destroyChild();
}

function startGame(): void {
  clearContainer();
  gamePage.showGame();
}

