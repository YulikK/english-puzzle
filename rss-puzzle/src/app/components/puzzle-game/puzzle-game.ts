import { BaseComponent } from "@/app/components/base-components.ts";
import type Lessons from "@/app/model/lessons.ts";
import { URL } from "@/constant.ts";
import type { RoundType } from "@/app/utils/types.ts";
import { HintName } from "@/app/utils/types.ts";
import { div, span} from "../tags.ts";
import Box from "../box/box.ts";
import Puzzle from "../puzzle/puzzle.ts";
import Button from "../button/button.ts";
import type Hint from "../hint/hint.ts";
import type ProgressBar from "../progress-bar/progress-bar.ts";
import Statistic from "../modal/statistic/statistic.ts";
import classes from "./puzzle-game.module.scss";

export default class PuzzleGame extends BaseComponent {
  private container: BaseComponent;

  private puzzle: Puzzle;

  private progressBar: ProgressBar;

  private submitButton: BaseComponent;

  private showAnswerButton: BaseComponent;

  private showStatisticButton: BaseComponent;

  private missRounds: RoundType[] = []

  private box: Box;

  private wrap: {
    picture: BaseComponent;
    puzzle: BaseComponent;
    buttons: BaseComponent;
    separator: BaseComponent;
    [key: string]: BaseComponent;
  };

  private isMarked = false;

  private isWin = false;

  private isLessonEnd = false;

  private image: HTMLImageElement;

  private lessons: Lessons;

  private hint: Hint;

  private sentence: string[] = [];

  constructor(container: BaseComponent,
    hint: Hint,
    progressBar: ProgressBar,
    lessons: Lessons) {
    super({ tag: 'div', className: `${classes.gameWrapper} ${classes.game}` }); 

    this.container = container;
    this.lessons = lessons;
    this.hint = hint;
    this.progressBar = progressBar;
    this.wrap = {
      picture: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'picture'}),
      puzzle: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'puzzle' }),
      buttons: new BaseComponent({ tag: 'div', className: `${classes.buttonsContainer}` }),
      separator: div({className: classes.separator})
    };
    this.box = new Box(this.wrap.picture, this.wrap.puzzle);
    
    this.submitButton = Button({textContent: 'Check', onClick: this.onSubmit, className: classes.hide});
    this.showAnswerButton = Button({ textContent: 'Show answer', onClick: this.showAnswer });
    this.showStatisticButton = Button({ textContent: 'Statistic', onClick: this.showStatistic, className: classes.hide });
    
    this.wrap.buttons.appendChild([this.showAnswerButton, this.showStatisticButton, this.submitButton]);

    this.appendChild([this.wrap.picture,
      this.wrap.separator,
      this.wrap.puzzle,
    this.wrap.buttons]);

    this.image = new Image();
    this.puzzle = new Puzzle(this.image,
      this.hint.options.getOptions(HintName.onPicture),
      this.puzzleClickCallback,
      this.dragStartCallback,
      this.dragEndCallback);

    const currentLesson = this.lessons.getCurrentLesson();
    if (currentLesson) {
      this.image.onload = this.onLoadImage;
      this.image.src = `${URL}images/${currentLesson.levelData.imageSrc}`;
      this.sentence = this.lessons.getSentence().split(' ');
    }
    this.container.getElement().append(this.element);
    
  }

  public backgroundToggle = (value: boolean): void => {
    this.puzzle.backgroundToggle(value);
  }

  private onLoadImage = (): void => {
    this.getElement().style.width = `${this.image.width}px`;
    this.hint.updatePlayFile();
    this.hint.updatesTextTranslate();
    this.renderRound();
  };

  private renderRound(): void {
    if (this.lessons.getCountRound() > 0) {
      this.fixLine();
    }
    this.hideCheck();
    const line = this.lessons.getCountRound();
    const wordCount = this.sentence.length;

    const partWidth = this.image.width / wordCount;
    const partHeight = this.image.height / 10;

    this.box.renderRound(partWidth, partHeight, line, wordCount);
    this.puzzle.createPuzzle(partWidth, partHeight, line, wordCount, this.sentence);

    this.shufflePuzzle();
  }

  private fixLine(): void {
    this.puzzle.fixLine();
    this.box.fixLine();
  }

  private shufflePuzzle(): void {
    const blocks = [...this.puzzle.getElements()];
    for (let i = this.box.source.length - 1; i >= 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * blocks.length);
      const block = blocks[randomIndex];
      blocks.splice(randomIndex, 1);
      if (block && this.box.source[i]) {
        this.box.source[i]?.appendChild([block]);
      }
    }
    
  }

  private puzzleClickCallback = (currentPuzzle: BaseComponent | undefined): void => {
    if (this.isMarked) {
      this.hideMark();
    }
    if (currentPuzzle) {
      this.box.movePuzzleToFirstEmpty(currentPuzzle);
    }
    this.isComplete();
  }

  private dragStartCallback = (): void => {
    if (this.isMarked) {
      this.hideMark();
    }
  }

  private dragEndCallback = (currentBlock: BaseComponent): void =>{
    this.box.movePuzzleToOverContainer(currentBlock);
    this.isComplete();
  }

  private isComplete(): void {
    if (this.box.isComplete()) {
      this.showCheck();
    }
  }

  private showCheck(): void {
    this.submitButton.removeClass(classes.hide!);
  }

  private hideCheck(): void {
    this.submitButton.addClass(classes.hide!);
  }

  private markAnswer(): void {
    this.isMarked = true;
    this.isWin = this.box.isCorrectAnswer();;
  }

  private onSubmit = (): void => {
    if (this.isLessonEnd) {
      this.startNewLesson();
    } else if (!this.isWin) {
      this.checkAnswer();
      } else {
      this.startNewRound();
    }
  }

  private startNewLesson(): void {
    this.fixLine();
    this.lessons.setNextLevel();
    this.sentence = this.lessons.getSentence().split(' ');
    this.image.src = `${URL}images/${this.lessons.getCurrentLesson()?.levelData.imageSrc}`;
    this.submitButton.getElement().textContent = 'Check';
    this.showAnswerButton.removeClass(classes.hide!);
    this.wrap.picture.destroyChild();
    this.wrap.picture.clear();
    this.wrap.picture.clearChild();
    this.wrap.separator.destroyChild();
    this.isLessonEnd = false;
    this.isWin = false;
  }

  private checkAnswer(): void {
    this.markAnswer();
    if (this.isWin) {
      this.showAnswerButton.addClass(classes.hide!);
      this.submitButton.getElement().textContent = 'Continue';
    }
  }

  private startNewRound(): void {
    this.hideMark();
    this.fixLine();
    this.lessons.setNextRound();
    this.hint.updatePlayFile();
    this.hint.updatesTextTranslate();
    this.showAnswerButton.removeClass(classes.hide!);
    
    this.sentence = this.lessons.getSentence().split(' ');
    if (this.lessons.getCountRound() < this.lessons.getLessonLength()) {
      this.renderRound();
      this.submitButton.getElement().textContent = 'Check';
      this.isWin = false;
    } else {
      this.showPictureInformation();
      this.submitButton.getElement().textContent = 'Next lesson';
      this.showStatisticButton.removeClass(classes.hide!);
      this.showAnswerButton.addClass(classes.hide!);
      this.isLessonEnd = true;
    }
  }

  private showPictureInformation(): void {
    this.wrap.picture.getElement().style.backgroundImage = `url(${this.image.src})`;
    this.wrap.separator.appendChild([div({ className: classes.infoWrap },
      span({ className: classes.infoText, textContent: `Author: ${this.lessons.getCurrentLesson()?.levelData.author}` }),
      span({ className: classes.infoText, textContent: `Name: ${this.lessons.getCurrentLesson()?.levelData.name}` }),
      span({ className: classes.infoText, textContent: `${this.lessons.getCurrentLesson()?.levelData.year}` }))
    ]);
    this.box.showPicture();
  }

  private hideMark(): void {
    this.isMarked = false;
    this.box.hideMark();
    if (this.isWin) {
      this.submitButton.getElement().textContent = 'Check';
      this.isWin = false;
    }
  }

  private showAnswer = (): void => {
    this.showAnswerButton.addClass(classes.hide!);
    const round = this.lessons.getCurrentRound();
    if (round) {
      this.missRounds.push(round);
    }
    this.box.showAnswer(this.puzzle.getElements());
    this.isWin = true;
    this.submitButton.getElement().textContent = 'Continue';
    this.showCheck();
  }

  private showStatistic = (): void => {
    this.removeClass(classes.game!);
    this.hint.hide();
    this.progressBar.hide();
    this.clear();
    this.clearChild();
    const statisticModal = new Statistic(this.container, this.lessons, this.missRounds, this.continueClickCallback);
    statisticModal.init();
  }

  private continueClickCallback = (): void => {
    this.showStatisticButton.addClass(classes.hide!);
    this.addClass(classes.game!);
    this.hint.show();
    this.progressBar.show();
    this.appendChild([this.wrap.picture,
      this.wrap.separator,
      this.wrap.puzzle,
      this.wrap.buttons]);
    this.startNewLesson();
    this.container.getElement().append(this.element);
  }
}