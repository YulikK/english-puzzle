import { BaseComponent } from "@/app/components/base-components.ts";
import classes from "./puzzle-game.module.scss";
import { div, span } from "../tags.ts";
import Button from "../button/button.ts";

export default class PuzzleGame extends BaseComponent {
  private container: BaseComponent;

  private puzzles: BaseComponent[] = [];

  private emptyBlocks: {
    sources: BaseComponent[];
    answer: BaseComponent[];
    [key: string]: BaseComponent[];
  } = {
    sources: [],
    answer: []
  }

  private overElement: HTMLElement | null = null;

  private submitButton: BaseComponent;

  private showAnswerButton: BaseComponent;

  private wrap: {
    picture: BaseComponent;
    puzzle: BaseComponent;
    buttons: BaseComponent;
    [key: string]: BaseComponent;
  };

  private backgroundOption = true;

  private isMarked = false;

  private isWin = false;

  private dragging: BaseComponent | null = null;

  private image: HTMLImageElement;

  private roundText: string[] = [];

  private level: string[];

  private currentLevel = 0;

  constructor(container: BaseComponent, backgroundOption: boolean) {
    super({ tag: 'div', className: classes.gameWrapper }); 

    this.container = container;
    this.backgroundOption = backgroundOption;
    this.wrap = {
      picture: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'picture'}),
      puzzle: new BaseComponent({ tag: 'div', className: `${classes.puzzleContainer}`, id: 'puzzle' }),
      buttons: new BaseComponent({ tag: 'div', className: `${classes.buttonsContainer}`})
    };
    this.submitButton = Button({textContent: 'Check', onClick: this.onSubmit, className: classes.hide});
    this.showAnswerButton = Button({ textContent: 'Show answer', onClick: this.showAnswer });
    
    this.wrap.buttons.appendChild([this.showAnswerButton, this.submitButton]);
    const lineContainerPuzzle = div({ className: classes.line });
    this.wrap.puzzle.appendChild([lineContainerPuzzle]);

    this.appendChild([this.wrap.picture,
      div({className: classes.separator}),
      this.wrap.puzzle,
    this.wrap.buttons]);
    
    
    
    this.image = new Image();
    this.level = ['The students agree they have too much homework',
      'They arrived at school at 7 a.m',
      "Is your birthday in August?",
      "There is a small boat on the lake",
      "I ate eggs for breakfast",
      "I brought my camera on my vacation",
      "The capital of the United States is Washington, D.C",
      "Did you catch the ball during the baseball game?",
      "People feed ducks at the lake",
      "The woman enjoys riding her bicycle"
    ];
    if (this.level.length) {
      const currentRound = this.level[this.currentLevel];
      if (currentRound) {
        this.roundText = currentRound.split(' ');
      }
    }
    
    this.image.onload = this.onLoadImage;
    this.image.src = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/level1/woodedla.jpg';

    this.container.getElement().append(this.element);

    
  }

  public backgroundToggle = (value: boolean): void => {
    this.backgroundOption = value;
    this.puzzles.forEach((puzzle) => {
      const puzzleElement = puzzle.getElement();
      puzzleElement.style.backgroundImage = value ? `url(${this.image.src})` : 'none';
    });
  }

  private onLoadImage = (): void => {
    this.wrap.picture.getElement().style.width = `${this.image.width}px`;
    this.renderRound();
  };

  private renderRound(): void {
    if (this.currentLevel > 0) {
      this.fixLine();
    }
    this.hideCheck();
    const lineContainerPicture = div({ className: `${classes.pictureLine}` });
    this.wrap.picture.appendChild([lineContainerPicture]);
    const line = this.currentLevel;
    const wordCount = this.roundText.length;

    const partWidth = this.image.width / wordCount;
    const partHeight = this.image.height / 10;
    
    const lineContainer = this.wrap.picture.getElement().lastChild;
    if (lineContainer && lineContainer instanceof HTMLElement) {
      lineContainer.style.height = `${partHeight}px`;
    }
    
    for (let word = 0; word < wordCount; word += 1) {
      this.createPuzzle(line, word, partWidth, partHeight);
      this.createEmptyBlock(line, word, partWidth, partHeight);
    }

    this.shufflePuzzle();
  }

  private fixLine(): void {
    this.puzzles.forEach((puzzle) => {
      const blockElement = puzzle.getElement();
      blockElement.style.backgroundImage = `url(${this.image.src})`;
    });
    this.emptyBlocks.answer.forEach((block) => {
      const blockElement = block.getElement();
      blockElement.ondragover = null;
      blockElement.ondragleave = null;
    });
    this.puzzles.forEach((block) => {
      const blockElement = block.getElement();
      blockElement.ondragstart = null;
      blockElement.ondragend = null
      blockElement.onclick = null;
      blockElement.draggable = false;
    });
    this.emptyBlocks.sources.forEach((block) => {
      block.destroy();
    });
    this.puzzles = [];
    this.emptyBlocks.sources = [];
    this.emptyBlocks.answer = [];

  }

  private createEmptyBlock(line: number, word: number, partWidth: number, partHeight: number): void {
    const emptyBlockPuzzle = div({ id: `sources-${line}-${word}`, className: classes.container, ondragover: this.onDragOver, ondragleave: this.onDragLeave });
    emptyBlockPuzzle.getElement().style.width = `${partWidth}px`;
    emptyBlockPuzzle.getElement().style.height = `${partHeight}px`;
    this.emptyBlocks.sources.push(emptyBlockPuzzle);
    const lineContainer = this.wrap.puzzle.getElement().lastChild;
    if (lineContainer && lineContainer instanceof HTMLElement) {
      lineContainer.append(emptyBlockPuzzle.getElement());
    }

    const emptyBlockPict = div({ id: `answer-${line}-${word}`, className: `${classes.container}`, ondragover: this.onDragOver, ondragleave: this.onDragLeave });
    emptyBlockPict.getElement().style.width = `${partWidth}px`;
    emptyBlockPict.getElement().style.height = `${partHeight}px`;
    const lastChildren = this.wrap.picture.getElement().lastChild;
    if (lastChildren && lastChildren instanceof HTMLElement) {
      lastChildren.append(emptyBlockPict.getElement());
    }
    this.emptyBlocks.answer.push(emptyBlockPict);
  }

  private createPuzzle(live: number, word: number, partWidth: number, partHeight: number): void {
    const block = div({ id: `bl-${live}-${word}`, className: classes.block, draggable: true, ondragstart: this.dragStart, ondragend: this.dragEnd, onclick: this.onPuzzleClick },
      span({ className: classes.text, textContent: this.roundText[word] })
    );
    const element = block.getElement();
    element.style.backgroundImage = this.backgroundOption ? `url(${this.image.src})` : 'none';
    element.style.backgroundPosition = `-${word * partWidth}px -${live * partHeight}px`;
    element.style.width = `${partWidth}px`;
    element.style.height = `${partHeight}px`;
    this.puzzles.push(block);
  }


  private shufflePuzzle(): void {
    const blocks = [...this.puzzles];
    for (let i = this.emptyBlocks.sources.length - 1; i >= 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * blocks.length);
      const block = blocks[randomIndex];
      blocks.splice(randomIndex, 1);
      if (block && this.emptyBlocks.sources[i]) {
        this.emptyBlocks.sources[i]?.appendChild([block]);
      }
        
    }
    
  }

  private onPuzzleClick = (event: MouseEvent): void => {
    if (this.isMarked) {
      this.hideMark();
    }
    if (event.currentTarget && event.currentTarget instanceof HTMLElement) {

      const idEl = event.currentTarget.id.split('-')[2];
      const currentPuzzle = this.puzzles[parseInt(idEl!, 10)];

      if (currentPuzzle) {
        const prevGroup = this.getPrevContainerGroup(currentPuzzle);
        const newGroup = this.getOppositeContainerGroup(prevGroup);
        this.clearPrevContainer(prevGroup, currentPuzzle);
        this.updateNewContainer(newGroup, currentPuzzle);
      }
      this.isComplete();
    }
    
  }

  private getPrevContainerGroup(puzzle: BaseComponent): keyof typeof this.emptyBlocks {
    let prevContainer = 'sources';
    let foundBlock = this.emptyBlocks.sources.find((element) => {
      const child = element.getChildren()[0];
      return child === puzzle
    });
    if (foundBlock) {
      prevContainer = 'sources';
    } else {
      foundBlock = this.emptyBlocks.answer.find((element) => {
        const child = element.getChildren()[0];
        return child === puzzle
      });
      if (foundBlock) {
        prevContainer = 'answer';
      }
    }
      
    return prevContainer;
  }

  private getOppositeContainerGroup(group: keyof typeof this.emptyBlocks): keyof typeof this.emptyBlocks {
    let oppositeContainer = 'sources';
    if (group === 'sources') {
      oppositeContainer = 'answer';
    } else {
      oppositeContainer = 'sources';
    }
    return oppositeContainer;
  }

  private clearPrevContainer(group: keyof typeof this.emptyBlocks, puzzle: BaseComponent): void {
      const foundBlock = this.emptyBlocks[group]?.find((element) => {
        const child = element.getChildren()[0];
        return child === puzzle
      });
      if (foundBlock) {
        foundBlock.clearChild();
      }
    
  }

  private updateNewContainer(group: keyof typeof this.emptyBlocks, puzzle: BaseComponent, newContainer?: HTMLElement): void {
    if (group && newContainer) {
      const myContainer= this.emptyBlocks[group]?.find((element) => element.getElement() === newContainer);
      if (myContainer) {
        myContainer.appendChild([puzzle]);
      }
    } else if (group) {
      const emptyBlock= this.emptyBlocks[group]?.find((element) => element.getChildren().length === 0);
      if (emptyBlock) {
        emptyBlock.appendChild([puzzle]);
      }
    }
  }

  private getOverContainer(block: HTMLElement): keyof typeof this.emptyBlocks {
    let overContainer = 'answer';
    let foundBlock = this.emptyBlocks.sources.find((element) => {
      const child = element.getElement();
      return child === block
    });
    if (foundBlock) {
      overContainer = 'sources';
    } else {
      foundBlock = this.emptyBlocks.answer.find((element) => {
        const child = element.getElement();
        return child === block
      });
      if(foundBlock) {
        overContainer = 'answer';
      }
    }
    return overContainer;
  }

  private dragStart = (event: DragEvent): void => {
    if (this.isMarked) {
      this.hideMark();
    }
    if (event.dataTransfer && event.target && event.target instanceof HTMLElement) {
      
      const idEl = event.target.id.split('-')[2];
      const currentBlock = this.puzzles[parseInt(idEl!, 10)];
      if (currentBlock) {
        this.dragging = currentBlock;
        setTimeout(() => currentBlock?.addClass(classes.dragging!), 0)
      }
      
    }
  }

  private dragEnd = (): void => {
    if (this.overElement && this.dragging) {
      const overBlock = this.overElement;
      const newContainer = this.getOverContainer(overBlock);
      const currentBlock = this.dragging;

      if (newContainer){
        const prevContainer = this.getPrevContainerGroup(currentBlock);
        this.clearPrevContainer(prevContainer, currentBlock);
        this.updateNewContainer(newContainer, currentBlock, overBlock);
        this.overElement = null;
      }
    }
    if(this.dragging){
      this.dragging.removeClass(classes.dragging!);
      this.dragging = null;
    }
    this.emptyBlocks.answer.forEach(block => {
      block.removeClass(classes.choose!);
    });
    this.emptyBlocks.sources.forEach(block => {
      block.removeClass(classes.choose!);
    });
    this.isComplete();
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

  private isComplete(): void {
    let complete = true;
    this.emptyBlocks.sources.forEach(block => {
      if (block.getElement().firstChild) {
        complete = false;
      }
    });
    if (complete) {
      this.showCheck();
    }
  }

  private showCheck(): void {
    this.submitButton.removeClass(classes.hide!);
  }

  private hideCheck(): void {
    this.submitButton.addClass(classes.hide!);
  }

  private onSubmit = (): void => {
    if (!this.isWin) {
      let isWin = true;
      this.isMarked = true;
      this.emptyBlocks.answer.forEach((block, index) => {
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
      if (isWin) {
        this.submitButton.getElement().textContent = 'Continue';
      }
      this.isWin = isWin;
    } else {
      this.hideMark();
      this.currentLevel += 1;
      if (this.currentLevel < this.level.length) {
        if (this.level.length) {
          const currentRound = this.level[this.currentLevel];
          if (currentRound) {
            this.roundText = currentRound.split(' ');
          }
        }
        this.renderRound();
        this.submitButton.getElement().textContent = 'Check';
        this.isWin = false;
      } else {
        this.submitButton.getElement().textContent = 'You win';
      }
    }
    
  }

  private hideMark(): void {
    this.isMarked = false;
    this.emptyBlocks.answer.forEach(block => {
      block.removeClass(classes.error!);
      block.removeClass(classes.success!);
    });
    if (this.isWin) {
      this.submitButton.getElement().textContent = 'Check';
      this.isWin = false;
    }
  }

  private showAnswer = (): void => {
    this.puzzles.forEach((puzzle, index) => {
      const answerBlock = this.emptyBlocks.answer[index];
      if (answerBlock) {
        answerBlock.clear();
        answerBlock.clearChild();
        answerBlock.appendChild([puzzle]);
      }
      const sourcesBlock = this.emptyBlocks.sources[index];
      if (sourcesBlock) {
        sourcesBlock.clear();
        sourcesBlock.clearChild();
      }
    });
    this.isWin = true;
    this.submitButton.getElement().textContent = 'Continue';
    this.showCheck();
  }
}