import { BaseComponent } from "@/app/components/base-components";
import classes from "./game.module.scss";
import { div, aside, a, img } from "@/app/components/tags";
import { Header } from "@/app/components/header/header";
import { ProgressBar } from "@/app/components/progress-bar/progress-bar";
import Options from "@/app/Entities/options";
import Hint from "@/app/components/hint/hint";

export class Game extends BaseComponent {
  private container: HTMLElement;
  private options: Options;
  private header: Header;
  private progressBar: ProgressBar;
  private hintOptionsContainer: BaseComponent;
  private hintContainer: BaseComponent;
  private hint: Hint;

  constructor(container: HTMLElement, options:Options, logoutCallback: () => void) {
    super({ tag: 'div', className: classes.gamePage }); 

    this.container = container;
    this.options = options;
    this.header = new Header(logoutCallback);
    this.progressBar = new ProgressBar();
    this.hintOptionsContainer = div({ className: classes.hintOptions });
    this.hintContainer = div({ className: classes.hint });
    this.hint = new Hint(this.options);
    this.hintOptionsContainer.appendChild(this.hint.getOptions());
    this.hintContainer.appendChild(this.hint.getHint());
  }

  showGame() {
    this.container.append(this.element);
    this.appendChild([this.header,
      div({ className: classes.main },
        aside({ className: classes.menu },
          div({ className: classes.menuWrapper }, 
            this.progressBar,
            this.hintOptionsContainer,
            div({ className: classes.linksWrapper },
              a({ className: classes.link, href: 'https://github.com/YulikK', target: '_blank' },
                img( { src: 'img/git.png', alt: 'GitHub', className: classes.logoGit})
              ),
              a({ className: classes.link, href: 'https://rs.school/js/', target: '_blank' },
                img( { src: 'img/RS.png', alt: 'RS School', className: classes.logoRs})
              )
            )
          )
        ),
        div({ className: classes.gameWrapper },
          this.hintContainer))
      ])
  }
  
}