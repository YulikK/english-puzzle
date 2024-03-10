import { BaseComponent } from "@/app/components/base-components";
import { div, h2 } from "@/app/components/tags";
import { Button } from "@/app/components/button/button";
import { Input } from "../../input/input";
import classes from "./auth.module.scss";
import User from "@/app/Entities/user";
import { FieldName } from "@/app/utils/types";

export class Auth extends BaseComponent {
  public loginBtn: BaseComponent;
  private modal: BaseComponent;
  private user: User;
  private firstName: Input;
  private lastName: Input;
  private errorsContainer: {
    firstName: BaseComponent;
    lastName: BaseComponent;
  }
  private loginCallback: () => void;
  constructor(user: User, loginCallback: () => void) {
    super({ tag: 'form', className: classes.authPage, id: 'auth'}); 
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
    
    this.firstName = new Input({ id: FieldName.firstName, type: 'text', placeholder: 'First name', errorContainer: this.errorsContainer.firstName});
    this.lastName = new Input({ id: FieldName.lastName, type: 'text', placeholder: 'Last name', errorContainer: this.errorsContainer.lastName});
    
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
  }

  private validateForm = (): boolean =>  {
    return this.firstName.isValid() && this.lastName.isValid();
  }
}