import "modern-normalize/modern-normalize.css";
import './app.scss';
import StartPage from './app/pages/start/start-page.ts';
import Game from './app/pages/game/game.ts';
import Store from "./app/API/store.ts";
import User from "./app/Entities/user.ts";
import Options from './app/Entities/options.ts';
import mockData from "./app/data/mock.ts";
import Lessons from "./app/model/lessons.ts";
import Confirm from "./app/components/modal/confirm/confirm.ts";

const {body} = document;
const store = new Store();
const user = new User(store);
const options = new Options(store)
const dataModel = new Lessons(mockData, store);

function clearContainer(): void {
  body.innerHTML = '';
}

function clearUser(): void {
  store.removeUser();
  dataModel.resetProgress();
  user.clear();
}

function logout(): void {
  const confirm = new Confirm(body, confirmLogout);
  confirm.init();
}

function confirmLogout(): void {
  clearUser();
  clearContainer();
  startPage.logout();
}

function startGame(): void {
  clearContainer();
  const gamePage = new Game(body, options, logout, dataModel);
  gamePage.showGame();
}

const startPage = new StartPage(body, user, startGame, logout);
startPage.initApp();






