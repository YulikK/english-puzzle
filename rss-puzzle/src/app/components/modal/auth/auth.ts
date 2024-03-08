import { Abstract } from "@/app/components/abstract-components";
import { div, h2 } from "@/app/components/tags";
import { Button } from "@/app/components/button/button";
import { Input } from "../../input/input";
import classes from "./auth.module.scss";
import Store from "@/app/API/store";
import User from "@/app/Entities/user";

export class Auth extends Abstract {
  public loginBtn: Abstract;
  private modal: Abstract;
  private store: Store;
  private user: User;
  private firstName: Input;
  private lastName: Input;
  private errorsContainer: {
    firstName: Abstract;
    lastName: Abstract;
  }
  private loginCallback: () => void;
  constructor(store: Store, user: User, loginCallback: () => void) {
    super({ tag: 'form', className: classes.authPage, id: 'auth'}); 
    this.store = store;
    this.user = user;
    this.loginCallback = loginCallback;
    
    this.loginBtn = Button({
      textContent: 'Login',
      onClick: this.login,
      className: classes.login,
      
    });
    this.errorsContainer = {
      firstName: div({ className: classes.errorContainer }),
      lastName: div({ className: classes.errorContainer })
    }
    
    this.firstName = new Input({ id: 'firstName', type: 'text', placeholder: 'First name', errorContainer: this.errorsContainer.firstName});
    this.lastName = new Input({ id: 'lastName', type: 'text', placeholder: 'Last name', errorContainer: this.errorsContainer.lastName});
    
    this.modal = div({ className: classes.wrapper },
      h2(classes.tittle!, 'User Login'),
      div({ className: classes.inputWrapper },
        this.firstName,
        this.errorsContainer.firstName),
      div({ className: classes.inputWrapper },
        this.lastName,
        this.errorsContainer.lastName),
      this.loginBtn
      );

    this.appendChild([this.modal])
  }

  login = () => {

    if (this.validateForm()) {
      this.updateUser();
      this.loginCallback();
    }
    
  }

  private updateUser() {
    const firstName = this.firstName.getValue();
    const lastName = this.lastName.getValue();
    this.user.setName(firstName, lastName);
    this.store.setUser(this.user);
  }

  private validateForm = (): boolean =>  {
    return this.firstName.isValid() && this.lastName.isValid();
  }
}