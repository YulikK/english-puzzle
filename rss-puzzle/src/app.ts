import "modern-normalize/modern-normalize.css";
import './app.scss';
import StartPage from './app/pages/start/start-page.ts';
import Game from './app/pages/game/game.ts';
import Store from "./app/API/store.ts";
import User from "./app/Entities/user.ts";
import Options from './app/Entities/options.ts';

const {body} = document;
const store = new Store();
const user = new User(store);
const options = new Options(store)

function clearContainer(): void {
  body.innerHTML = '';
}

function clearUser(): void {
  store.removeUser();
  user.clear();
}

function logout(): void {
  clearUser();
  clearContainer();
}

const gamePage = new Game(body, options, logout);

function startGame(): void {
  clearContainer();
  gamePage.showGame();
}

const startPage = new StartPage(body, user, startGame, logout);







