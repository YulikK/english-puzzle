import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h2 } from "@/app/components/tags.ts";
import Button from "@/app/components/button/button.ts";
import type User from "@/app/Entities/user.ts";
import type { Callback } from "@/app/utils/types.ts";
import { FieldName } from "@/app/utils/types.ts";
import Input from "../../input/input.ts";
import classes from "./auth.module.scss";

export default class Auth extends BaseComponent {
  public loginBtn: BaseComponent;

  private modal: BaseComponent;

  private user: User;

  private firstName: Input;

  private lastName: Input;

  private errorsContainer: {
    firstName: BaseComponent;
    lastName: BaseComponent;
  }

  private loginCallback: Callback;

  constructor(user: User, loginCallback: Callback) {
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

  private login = (): void => {

    if (this.validateForm()) {
      this.updateUser();
      this.loginCallback();
    }
    
  }

  private updateUser(): void {
    const firstName = this.firstName.getValue();
    const lastName = this.lastName.getValue();
    this.user.setName(firstName, lastName);
  }

  private validateForm = (): boolean =>  this.firstName.isValid() && this.lastName.isValid()
}