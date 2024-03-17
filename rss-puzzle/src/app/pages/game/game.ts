import { BaseComponent } from "@/app/components/base-components.ts";
import { div } from "@/app/components/tags.ts";
import Header from "@/app/components/header/header.ts";
import ProgressBar from "@/app/components/progress-bar/progress-bar.ts";
import type Options from "@/app/Entities/options.ts";
import Hint from "@/app/components/hint/hint.ts";
import PuzzleGame from "@/app/components/puzzle-game/puzzle-game.ts";
import type Lessons from "@/app/model/lessons";
import classes from "./game.module.scss";

export default class Game extends BaseComponent {
  private container: HTMLElement;

  private options: Options;

  private header: Header;

  private progressBar: ProgressBar;

  private progressBarContainer: BaseComponent;

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
    this.puzzleGameContainer = div({ className: classes.gameWrapper });
    this.progressBarContainer = div({ className: classes.progressBarContainer });
    this.hintContainer = div({ className: classes.hintContainer });
    this.progressBar = new ProgressBar(this.progressBarContainer, this.lessons);
    this.puzzleGameContainer.append(div({className: classes.wrap}, this.progressBarContainer, this.hintContainer));
    this.hint = new Hint(this.hintContainer, this.options, this.lessons);
    this.puzzleGame = new PuzzleGame(this.puzzleGameContainer, this.hint, this.progressBar, this.lessons);
    this.hint.setOnPictureCallback(this.puzzleGame.backgroundToggle);
  }

  public showGame(): void {
    this.container.append(this.element);
    this.appendChild([this.header,
      div({ className: classes.main },
        this.puzzleGameContainer
      )
    ]);
  }
  
}