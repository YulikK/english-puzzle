import { BaseComponent } from "@/app/components/base-components.ts";
import { div, aside, a, img } from "@/app/components/tags.ts";
import Header from "@/app/components/header/header.ts";
import ProgressBar from "@/app/components/progress-bar/progress-bar.ts";
import type Options from "@/app/Entities/options.ts";
import Hint from "@/app/components/hint/hint.ts";
import PuzzleGame from "@/app/components/puzzle-game/puzzle-game.ts";
import { HintName } from "@/app/utils/types.ts";
import classes from "./game.module.scss";
import Lessons from "@/app/model/lessons";

export default class Game extends BaseComponent {
  private container: HTMLElement;

  private options: Options;

  private header: Header;

  private progressBar: ProgressBar;

  private hintOptionsContainer: BaseComponent;

  private hintContainer: BaseComponent;

  private puzzleGameContainer: BaseComponent;

  private hint: Hint;

  private puzzleGame: PuzzleGame;

  private lessons: Lessons

  constructor(container: HTMLElement, options:Options, logoutCallback: () => void, lessons: Lessons) {
    super({ tag: 'div', className: classes.gamePage }); 

    this.container = container;
    this.options = options;
    this.lessons = lessons;
    this.header = new Header(logoutCallback);
    this.progressBar = new ProgressBar();
    this.hintOptionsContainer = div({ className: classes.hintOptions });
    this.hintContainer = div({ className: classes.hint });
    this.hint = new Hint(this.options, this.lessons);
    this.hintOptionsContainer.appendChild(this.hint.getOptions());
    this.hintContainer.appendChild(this.hint.getHint());
    this.puzzleGameContainer = div({ className: classes.gameWrapper }, this.hintContainer);
    this.puzzleGame = new PuzzleGame(this.puzzleGameContainer, options.getOptions(HintName.onPicture), this.lessons);
    this.hint.setOnPictureCallback(this.puzzleGame.backgroundToggle);
  }

  public showGame(): void {
    this.container.append(this.element);
    this.appendChild([this.header,
      div({ className: classes.main },
        aside({ className: classes.menu },
          div({ className: classes.menuWrapper },
            this.progressBar,
            this.hintOptionsContainer,
            div({ className: classes.linksWrapper },
              a({ className: classes.link, href: 'https://github.com/YulikK', target: '_blank' },
                img({ src: 'img/git.png', alt: 'GitHub', className: classes.logoGit })
              ),
              a({ className: classes.link, href: 'https://rs.school/js/', target: '_blank' },
                img({ src: 'img/RS.png', alt: 'RS School', className: classes.logoRs })
              )
            )
          )
        ),
        this.puzzleGameContainer
      )
    ]);
  }
  
}