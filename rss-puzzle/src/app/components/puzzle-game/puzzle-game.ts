import { BaseComponent } from "@/app/components/base-components.ts";
import type Lessons from "@/app/model/lessons.ts";
import { URL } from "@/constant.ts";
import { div} from "../tags.ts";
import Box from "../box/box.ts";
import Puzzle from "../puzzle/puzzle.ts";
import Button from "../button/button.ts";
import classes from "./puzzle-game.module.scss";

export default class PuzzleGame extends BaseComponent {
  private container: BaseComponent;

  private puzzle: Puzzle;

  private submitButton: BaseComponent;

  private showAnswerButton: BaseComponent;

  private box: Box;

  private wrap: {
    picture: BaseComponent;
    puzzle: BaseComponent;
    buttons: BaseComponent;
    [key: string]: BaseComponent;
  };

  private backgroundOption = true;

  private isMarked = false;

  private isWin = false;

  private isLessonEnd = false;

  private image: HTMLImageElement;

  private lessons: Lessons;

  private sentence: string[] = [];

  constructor(container: BaseComponent, backgroundOption: boolean, lessons: Lessons) {
    super({ tag: 'div', className: classes.gameWrapper }); 

    this.container = container;
    this.lessons = lessons;
    this.backgroundOption = backgroundOption;
    this.wrap = {
      picture: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'picture'}),
      puzzle: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'puzzle' }),
      buttons: new BaseComponent({ tag: 'div', className: `${classes.buttonsContainer}`})
    };
    this.box = new Box(this.wrap.picture, this.wrap.puzzle);
    
    this.submitButton = Button({textContent: 'Check', onClick: this.onSubmit, className: classes.hide});
    this.showAnswerButton = Button({ textContent: 'Show answer', onClick: this.showAnswer });
    
    this.wrap.buttons.appendChild([this.showAnswerButton, this.submitButton]);

    this.appendChild([this.wrap.picture,
      div({className: classes.separator}),
      this.wrap.puzzle,
    this.wrap.buttons]);

    this.image = new Image();
    this.puzzle = new Puzzle(this.image,
      this.backgroundOption,
      this.puzzleClickCallback,
      this.dragStartCallback,
      this.dragEndCallback);

    const currentLesson = this.lessons.getCurrentLesson();
    if (currentLesson) {
      this.image.onload = this.onLoadImage;
      this.image.src = `${URL}${currentLesson.levelData.imageSrc}`;
      this.sentence = this.lessons.getSentence().split(' ');
    }
    this.container.getElement().append(this.element);
    
  }

  public backgroundToggle = (value: boolean): void => {
    this.puzzle.backgroundToggle(value);
  }

  private onLoadImage = (): void => {
    this.getElement().style.width = `${this.image.width}px`;
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
      this.fixLine();
      this.lessons.setNextLevel();
      this.sentence = this.lessons.getSentence().split(' ');
      this.image.src = `${URL}${this.lessons.getCurrentLesson()?.levelData.imageSrc}`;
      
      
      this.submitButton.getElement().textContent = 'Check';
      this.wrap.picture.destroyChild();
      this.wrap.picture.clear();
      this.wrap.picture.clearChild();
      
      this.isLessonEnd = false;
      this.isWin = false;
    } else if (!this.isWin) {
        this.markAnswer();
        if (this.isWin) {
          this.submitButton.getElement().textContent = 'Continue';
        }
      } else {
        this.hideMark();
        this.lessons.setNextRound();
        
        this.sentence = this.lessons.getSentence().split(' ');
        if (this.lessons.getCountRound() < this.lessons.getLessonLength()) {
          this.renderRound();
          this.submitButton.getElement().textContent = 'Check';
          this.isWin = false;
        } else {
          this.submitButton.getElement().textContent = 'Next lesson';
          this.isLessonEnd = true;
        }
      }
    
    
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
    this.box.showAnswer(this.puzzle.getElements());
    this.isWin = true;
    this.submitButton.getElement().textContent = 'Continue';
    this.showCheck();
  }
}