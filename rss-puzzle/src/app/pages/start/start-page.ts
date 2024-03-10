import { BaseComponent } from "@/app/components/base-components";
import classes from "./start-page.module.scss";
import { Welcome } from "@/app/components/modal/welcome/welcome";
import { Auth } from "@/app/components/modal/auth/auth";
import User from "@/app/Entities/user";

export class StartPage extends BaseComponent {
  private container: HTMLElement;
  private welcomeComponent: BaseComponent | null = null;
  private authComponent: BaseComponent | null = null;
  private user: User;
  private startGameCallback: () => void;
  private logoutCallback: () => void;

  constructor(container: HTMLElement, user: User, startGameCallback: () => void, logoutCallback: () => void) {
    super({ tag: 'div', className: classes.startPage }); 

    this.container = container;
    this.startGameCallback = startGameCallback;
    this.logoutCallback = logoutCallback;
    this.user = user;
    
    if (!this.user.isEmpty()) {
      this.showWelcome();
    } else {
      this.showAuth();
    }
  }

  logout = (): void => {
    this.clearContainer();
    this.logoutCallback();
  }

  login = (): void => {
    this.clearContainer();
    this.showWelcome();
  }

  showAuth() {
    this.authComponent = new Auth(this.user, this.login);
    this.appendChild([this.authComponent]);
    this.container.append(this.element);
  }

  private clearContainer() {
    this.destroyChild();
  }

  private showWelcome() {
    this.welcomeComponent = new Welcome(this.user, this.logout, this.startGameCallback);
    this.appendChild([this.welcomeComponent]);
    this.container.append(this.element);
  }
}