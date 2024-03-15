import type { BaseComponent } from "../base-components";
import { div, span } from "../tags.ts";
import classes from "./puzzle.module.scss";

export default class Puzzle {
  private elements: BaseComponent[] = [];

  private image: HTMLImageElement;

  private showOption: boolean;

  private dragging: BaseComponent | null = null;

  private puzzleClickCallback: (currentPuzzle: BaseComponent | undefined) => void;

  private dragStartCallback: () => void;

  private dargEndCallback: (currentPuzzle: BaseComponent) => void;

  constructor(image: HTMLImageElement,
    showOption: boolean,
    puzzleClickCallback: (currentPuzzle: BaseComponent | undefined) => void,
    dragStartCallback: () => void,
    dargEndCallback: (currentPuzzle: BaseComponent) => void,) {
    this.image = image;
    this.showOption = showOption;
    this.puzzleClickCallback = puzzleClickCallback;
    this.dragStartCallback = dragStartCallback;
    this.dargEndCallback = dargEndCallback;
  }

  public createPuzzle(width: number, height: number, line: number, wordCount: number, sentence: string[]): void{
    for (let word = 0; word < wordCount; word += 1) {
      this.makeElement(line, word, width, height, sentence[word]);
    }
  }

  private makeElement(line: number, word: number, width: number, height: number, text: string | undefined): void {
    const block = div({
      id: `bl-${line}-${word}`,
      className: classes.block,
      draggable: true,
      ondragstart: this.dragStart,
      ondragend: this.dragEnd,
      onclick: this.onPuzzleClick
    },
      span({ className: classes.text, textContent: text })
    );
    const element = block.getElement();
    element.style.backgroundImage = this.showOption ? `url(${this.image.src})` : 'none';
    element.style.backgroundPosition = `-${word * width}px -${line * height}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    this.elements.push(block);
  }
  
  public backgroundToggle = (value: boolean): void => {
    this.showOption = value;
    this.elements.forEach((puzzle) => {
      const puzzleElement = puzzle.getElement();
      puzzleElement.style.backgroundImage = value ? `url(${this.image.src})` : 'none';
    });
  }

  public fixLine(): void {
    this.elements.forEach((puzzle) => {
      const blockElement = puzzle.getElement();
      blockElement.style.backgroundImage = `url(${this.image.src})`;
    });
    this.elements.forEach((block) => {
      const blockElement = block.getElement();
      blockElement.ondragstart = null;
      blockElement.ondragend = null
      blockElement.onclick = null;
      blockElement.draggable = false;
    });
    this.elements = [];
  }

  public getElements(): BaseComponent[] {
    return this.elements;
  }

  private onPuzzleClick = (event: MouseEvent): void => {
    if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
      const idEl = event.currentTarget.id.split('-')[2];
      const currentPuzzle = this.elements[parseInt(idEl!, 10)];
      this.puzzleClickCallback(currentPuzzle);
    }
  }

  private dragStart = (event: DragEvent): void => {
    if (event.dataTransfer && event.target && event.target instanceof HTMLElement) {
      const idEl = event.target.id.split('-')[2];
      const currentBlock = this.elements[parseInt(idEl!, 10)];
      if (currentBlock) {
        this.dragging = currentBlock;
        setTimeout(() => currentBlock?.addClass(classes.dragging!), 0)
      }
    }
    this.dragStartCallback();
  }

  private dragEnd = (): void => {
    if (this.dragging) {
      this.dargEndCallback(this.dragging);
      this.dragging.removeClass(classes.dragging!);
      this.dragging = null;
    }
  }
}