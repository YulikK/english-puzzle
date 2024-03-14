import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h1, p, img, a } from "@/app/components/tags.ts";
import classes from "./header.module.scss";

export default class Header extends BaseComponent {
  public logoutBtn: BaseComponent;

  private header: BaseComponent;

  private logoutCallback: () => void;

  constructor(logoutCallback: () => void) {
    super({ tag: 'header', className: classes.header }); 
    this.logoutCallback = logoutCallback;
    
    this.logoutBtn = a({ className: classes.logoutLink, onclick: this.logoutCallback},
      p(classes.logoutTittle!, 'Logout'),
      img({ src: '/img/logout.png', alt: 'Logout', className: classes.logoutIcon })
    );

    this.header = div({ className: classes.wrapper },
      div({ className: classes.logoWrapper },
        img({ src: '/img/Logo.png', alt: 'Logo', className: classes.logo}),
        h1(classes.tittle! , `English \n puzzle`)),
      div({ className: classes.logoutWrapper },
        img({ src: '/img/User.png', alt: 'User', className: classes.user }),
        this.logoutBtn
      )
    );

    this.appendChild([this.header])
  }
}