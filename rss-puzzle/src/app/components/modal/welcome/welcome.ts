import { BaseComponent } from "@/app/components/base-components";
import { div, h2, p } from "@/app/components/tags";
import { Button } from "@/app/components/button/button";
import { Header } from "@/app/components/header/header";
import classes from "./welcome.module.scss";
import { WELCOME_DESCRIPTION } from "../../../../constant";
import User from "@/app/Entities/user";

export class Welcome extends BaseComponent {
  public startBtn: BaseComponent;
  private modal: BaseComponent;
  private header: BaseComponent;
  private startCallback: () => void;

  constructor(user: User, logoutCallback: () => void, startCallback: () => void) {
    super({ tag: 'div', className: classes.pageWrapper }); 
    this.header = new Header(logoutCallback);
    this.startCallback = startCallback;
    const userName = user.getFullName();
    this.startBtn = Button({
      textContent: 'Start',
      onClick: () => {
        this.startCallback()
      },
      className: classes.start
    });

    this.modal = div({className: classes.welcomePage },
    div({ className: classes.wrapper },
      h2(classes.tittle!, `Dear, ${userName}!`),
      p(classes.description!, WELCOME_DESCRIPTION),
      this.startBtn
      ));

    this.appendChild([this.header, this.modal])
  }

}