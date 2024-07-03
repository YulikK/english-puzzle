import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h2, p } from "@/app/components/tags.ts";
import type { Callback } from "@/app/utils/types.ts";
import Button from "@/app/components/button/button.ts";
import Header from "@/app/components/header/header.ts";
import type User from "@/app/Entities/user.ts";
import { WELCOME_DESCRIPTION } from "../../../../constant.ts";
import classes from "./welcome.module.scss";

export default class Welcome extends BaseComponent {
  public startBtn: BaseComponent;

  private modal: BaseComponent;

  private header: BaseComponent;

  private startCallback: Callback;

  constructor(user: User, logoutCallback: Callback, startCallback: Callback) {
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