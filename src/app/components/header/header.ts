import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h1, p, img, a, span } from "@/app/components/tags.ts";
import type { Callback } from "@/app/utils/types";
import classes from "./header.module.scss";

export default class Header extends BaseComponent {
  public logoutBtn: BaseComponent;

  private header: BaseComponent;

  private logoutCallback: Callback;

  constructor(logoutCallback: Callback) {
    super({ tag: 'header', className: classes.header }); 
    this.logoutCallback = logoutCallback;
    
    this.logoutBtn = a({ className: classes.logoutLink, onclick: this.logoutCallback},
      p(classes.logoutTittle!, 'Logout'),
      img({ src: 'img/logout.png', alt: 'Logout', className: classes.logoutIcon })
    );

    this.header = div({ className: classes.wrapper },
      div({ className: classes.logoWrapper },
        img({ src: 'img/Logo.png', alt: 'Logo', className: classes.logo}),
        h1(classes.tittle!, `English \n puzzle`)),
      div({ className: classes.logoutWrapper },
        img({ src: 'img/User.png', alt: 'User', className: classes.user }),
        this.logoutBtn
      ),
      div({ className: classes.linksWrapper },
        a({ className: classes.link, href: 'https://github.com/YulikK', target: '_blank' },
          img({ src: 'img/git.png', alt: 'GitHub', className: classes.logoGit, width: 24, height: 24 }),
          span({ className: classes.linkText, textContent: 'GitHub/YulikK' })
        ),
        a({ className: classes.link, href: 'https://rs.school/js/', target: '_blank' },
          img({ src: 'img/RS.png', alt: 'RS School', className: classes.logoRs, width: 24, height: 24 }),
          span({ className: classes.linkText, textContent: 'RS School' })
        ))
    );

    this.appendChild([this.header])
  }
}