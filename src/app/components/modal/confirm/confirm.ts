import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h2, p } from "@/app/components/tags.ts";
import type { Callback } from "@/app/utils/types.ts";
import Button from "@/app/components/button/button.ts";
import { CONFIRM_LOGOUT } from "../../../../constant.ts";
import classes from "./confirm.module.scss";

const YES_TXT = 'Yes, delete';
const NO_TXT = 'No, back';

export default class Confirm extends BaseComponent {
  public yesBtn: BaseComponent;

  public noBtn: BaseComponent;

  private container: HTMLElement;

  private modal: BaseComponent;

  private logoutCallback: Callback;

  constructor(container: HTMLElement, logoutCallback: Callback) {
    super({ tag: 'aside', className: classes.background }); 
    this.logoutCallback = logoutCallback;
    this.container = container;
    this.yesBtn = Button({
      textContent: YES_TXT,
      onClick: () => {
        this.logoutCallback()
      },
      className: classes.yes
    });

    this.noBtn = Button({
      textContent: NO_TXT,
      onClick: () => {
        this.destroy();
      },
    });

    this.modal = div({className: classes.modal },
      div({ className: classes.wrapper },
        h2(classes.tittle!, `Confirm command`),
        p(classes.description!, CONFIRM_LOGOUT),
        div({ className: classes.buttonsWrapper },
          this.yesBtn,
          this.noBtn)
      )
    );

    this.appendChild([this.modal])
    
  }

  public init(): void {
    this.container.append(this.getElement());
  }
}