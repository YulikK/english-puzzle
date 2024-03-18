import type { BaseComponent } from "../base-components";
import { div } from "../tags.ts";
import classes from "./box.module.scss";

export default class Box {
  private answerContainer: BaseComponent;

  private sourcesContainer: BaseComponent;

  private answerLine: BaseComponent | null = null;

  private sourceLine: BaseComponent | null = null;

  private overElement: HTMLElement | null = null;

  public answer: BaseComponent[] = [];

  private fixAnswer: BaseComponent[][] = [];

  public source: BaseComponent[] = [];

  constructor(answerContainer: BaseComponent, sourcesContainer: BaseComponent) {
    this.answerContainer = answerContainer;
    this.sourcesContainer = sourcesContainer;

    this.makeSourceLine();
  }

  public renderRound(width: number, height:number, lineId: number, wordCount: number): void {
    this.makeAnswerLine(height);

    for (let word = 0; word < wordCount; word += 1) {
      const widthElement = Math.round(width / wordCount) + wordCount * 0.1;
      this.fillLines(lineId, word, widthElement, height);
    }
  }

  private makeAnswerLine(height: number): void {
    this.answerLine = div({ className: `${classes.pictureLine}`, height});
    this.answerContainer.appendChild([this.answerLine]);
  }

  private makeSourceLine(): void {
    this.sourceLine = div({ className: classes.line });
    this.sourcesContainer.appendChild([this.sourceLine]);
  }

  private createEmptyBlock(line: number, word: number, width?: number, height?: number): BaseComponent {
    const newBlock = div({
      id: `sources-${line}-${word}`,
      className: classes.container,
      ondragover: this.onDragOver,
      ondragleave: this.onDragLeave
    });
    if (width) {
      const margin = word === 0 ? 0 : width * 0.05
      newBlock.getElement().style.width = `${width}px`;
      newBlock.getElement().style.height = `${height}px`;
      newBlock.getElement().style.marginLeft = `-${margin}px`;
    }
    
    return newBlock;
  }

  private fillLines(line: number, word: number, width: number, height: number): void {
    const emptyBlockSource = this.createEmptyBlock(line, word, width, height);
    this.source.push(emptyBlockSource);
    this.sourceLine?.append(emptyBlockSource);

    const emptyBlockPict = this.createEmptyBlock(line, word, width, height);
    this.answer.push(emptyBlockPict);
    this.answerLine?.append(emptyBlockPict);
  }

  public fixLine(): void {
    this.fixAnswer.push(this.answer);
    this.answer.forEach((block) => {
      const blockElement = block.getElement();
      blockElement.ondragover = null;
      blockElement.ondragleave = null;
    });
    this.source.forEach((block) => {
      block.destroy();
    });
    this.sourceLine?.destroyChild();
    this.source = [];
    this.answer = [];
  }

  public showAnswer(puzzles: BaseComponent[]): void {
    puzzles.forEach((puzzle, index) => {
      const answerBlock = this.answer[index];
      if (answerBlock) {
        answerBlock.clear();
        answerBlock.clearChild();
        answerBlock.appendChild([puzzle]);
      }
      const sourcesBlock = this.source[index];
      if (sourcesBlock) {
        sourcesBlock.clear();
        sourcesBlock.clearChild();
      }
    });
  }

  public movePuzzleToFirstEmpty(puzzle: BaseComponent): void {
    const startArea = this.findStartArea(puzzle);
    const puzzleContainer = findPuzzleContainer(startArea, puzzle);
    const emptyContainer = this.findEmptyContainer(startArea === this.source ? 'answer' : 'source');
    if (puzzleContainer && emptyContainer) {
      puzzleContainer.clearChild();
      emptyContainer.append(puzzle);
    }
  }

  public movePuzzleToOverContainer(puzzle: BaseComponent): void {
    if (this.overElement) {
      const startArea = this.findStartArea(puzzle);
      const formContainer = findPuzzleContainer(startArea, puzzle);
      const toContainer = this.findContainer(this.overElement);
      if (formContainer && toContainer) {
        const puzzleForSwap = toContainer.getElement().firstChild;
        if (puzzleForSwap && puzzleForSwap instanceof HTMLElement) {
          toContainer.clearChild();
          formContainer.clearChild();
          toContainer.append(puzzle);
          formContainer.getElement().append(puzzleForSwap);
        } else {
          formContainer.clearChild();
          toContainer.append(puzzle);
        }
        this.overElement = null;
      }
    }
    this.setDefaultStyles();
  }

  private setDefaultStyles(): void {
    this.answer.forEach(block => {
      block.removeClass(classes.choose!);
    });
    this.source.forEach(block => {
      block.removeClass(classes.choose!);
    });
  }

  private findStartArea(puzzle: BaseComponent): BaseComponent[] {
    const isSource = this.findPuzzleInArea('source', puzzle);
    return isSource ? this.source : this.answer;

  }

  private findPuzzleInArea(area: 'source'| 'answer', puzzle: BaseComponent): boolean {
    const block = this[area].find((element) => {
      const child = element.getElement().firstChild;
      if (child) {
        return child === puzzle.getElement();
      }
      return false
    });
    return !!block;
  }

  private findEmptyContainer(area: 'source'| 'answer'): BaseComponent | undefined {
    return this[area].find((block) => {
      const child = block.getElement().firstChild;
      return !child;
    });
  }

  private findContainer(container: HTMLElement): BaseComponent | undefined {
    return this.source.find((block) => block.getElement() === container) || this.answer.find((block) => block.getElement() === container);
  }

  private onDragOver = (event: DragEvent): void => {
    event.preventDefault();
    if (event.target && event.target instanceof HTMLElement) {
      const {target} = event;
      this.overElement = target.closest(`.${classes.container}`);
      if (this.overElement) {
        this.overElement.classList.add(classes.choose!);
      }
    }
  }

  private onDragLeave = (): void => {
    if (this.overElement) {
      this.overElement.classList.remove(classes.choose!);
      this.overElement = null;
    }
    
  }

  public isCorrectAnswer(): boolean {
    let isWin = true;

    this.answer.forEach((block, index) => {
      const childBlock = block.getElement().firstChild;
      if (childBlock && childBlock instanceof HTMLElement) {
        const idStr = childBlock.id.split('-')[2];
        const id = idStr ? parseInt(idStr, 10) : null;
        if (index !== id) {
          isWin = false;
          block.addClass(classes.error!);
        } else {
          block.addClass(classes.success!);
        }
      }
    });
    return isWin;
  }

  public hideMark(): void {
    this.answer.forEach(block => {
      block.removeClass(classes.error!);
      block.removeClass(classes.success!);
    });
  }

  public isComplete(): boolean {
    let complete = true;
    this.source.forEach(block => {
      if (block.getElement().firstChild) {
        complete = false;
      }
    });
    return complete;
  }

  public showPicture(): void { 
    const line = this.answerContainer.getElement().querySelectorAll(`.${classes.pictureLine}`);
    line.forEach((block) => {
      block.classList.add(classes.showPicture!);
    });
    const blockPicture = this.answerContainer.getElement().querySelectorAll(`.${classes.container}`);
    blockPicture.forEach((block) => {
      block.classList.add(classes.showPicture!);
    });
  }

  public clearFixElements(): void {
    this.fixAnswer = [];
  }

  public resize(width: number, height: number): void {
    if (this.answerLine && this.sourceLine) {
      this.answerLine.getElement().style.height = `${height}px`;
      this.sourceLine.getElement().style.height = `${height}px`;
    }
    this.fixAnswer.forEach((line) => {
      const countElement = line.length;
      const widthElement = Math.round(width / countElement) + countElement * 0.1;
      line.forEach((block, index) => {
        const blockElement = block.getElement();
        blockElement.style.width = `${widthElement}px`;
        blockElement.style.height = `${height}px`;
        const margin = index === 0 ? 0 : widthElement * 0.05
        blockElement.style.marginLeft = `-${margin}px`;
      });
    });
    const countElement = this.answer.length;
    const widthElement = Math.round(width / countElement) + countElement * 0.1;
    this.answer.forEach((block, index) => {
        
      const blockElement = block.getElement();
      blockElement.style.width = `${widthElement}px`;
      blockElement.style.height = `${height}px`;
      const margin = index === 0 ? 0 : widthElement * 0.05
      blockElement.style.marginLeft = `-${margin}px`;
    });
    this.source.forEach((block, index) => {
      const blockElement = block.getElement();
      blockElement.style.width = `${widthElement}px`;
      blockElement.style.height = `${height}px`;
      const margin = index === 0 ? 0 : widthElement * 0.05
      blockElement.style.marginLeft = `-${margin}px`;
    });
  
  }
}

function findPuzzleContainer(group: BaseComponent[], puzzle: BaseComponent): BaseComponent | undefined {
  return group.find((block) => {
    const child = block.getElement().firstChild;
    if (child) {
      return child === puzzle.getElement();
    }
    return false
  });
}