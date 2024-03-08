import { Abstract } from "@/app/components/abstract-components";
import { div, h2, p } from "@/app/components/tags";
import { Button } from "@/app/components/button/button";
import { Header } from "@/app/components/header/header";
import classes from "./welcome.module.scss";
import { WELCOME_DESCRIPTION } from "../../../../constant";
import User from "@/app/Entities/user";

export class Welcome extends Abstract {
  public startBtn: Abstract;
  private modal: Abstract;
  private header: Abstract;

  constructor(user: User, logoutCallback: () => void) {
    super({ tag: 'div', className: classes.pageWrapper }); 
    this.header = new Header(logoutCallback);

    const userName = user.getFullName();
    this.startBtn = Button({
      textContent: 'Start',
      onClick: () => {
        console.log('onClick startBtn');
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