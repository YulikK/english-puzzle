import { Abstract } from "@/app/components/abstract-components";
import classes from "./start-page.module.scss";
import { Welcome } from "@/app/components/modal/welcome/welcome";
import { Auth } from "@/app/components/modal/auth/auth";
import Store from "@/app/API/store";
import User from "@/app/Entities/user";

export class StartPage extends Abstract {
  private container: HTMLElement;
  private welcomeComponent: Abstract | null = null;
  private authComponent: Abstract | null = null;
  private user: User;
  private store: Store;

  constructor(container: HTMLElement) {
    super({ tag: 'div', className: classes.startPage }); 

    this.container = container;
    this.store = new Store();
    this.user = new User();
    const saveUser: User | null = this.store.getUser();
    if (saveUser) {
      this.user.setName(saveUser.firstName, saveUser.lastName);
    }
    
    if (!this.user.isEmpty()) {
      this.showWelcome();
    } else {
      this.showAuth();
    }
  }

  logout = (): void => {
    this.clearUser();
    this.clearContainer();
    this.showAuth();
  }

  login = (): void => {
    this.clearContainer();
    this.showWelcome();
  }

  private clearContainer() {
    this.container.innerHTML = '';
    this.destroyChild();
  }

  private clearUser() {
    this.store.removeUser();
    this.user.clear();
  }

  private showAuth() {
    this.authComponent = new Auth(this.store, this.user, this.login);
    this.appendChild([this.authComponent]);
    this.container.append(this.element);
  }

  private showWelcome() {
    this.welcomeComponent = new Welcome(this.user, this.logout);
    this.appendChild([this.welcomeComponent]);
    this.container.append(this.element);
  }
}