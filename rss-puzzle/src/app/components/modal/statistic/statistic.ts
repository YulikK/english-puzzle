import { URL } from "@/constant.ts";
import type { TittleType , RoundType } from "@/app/utils/types.ts";
import type Lessons from "@/app/model/lessons.ts";
import { div, img, p, span } from "../../tags.ts";
import { BaseComponent } from "../../base-components.ts";
import Play from "../../play/play.ts";
import Button from "../../button/button.ts";
import classes from "./statistic.module.scss";

type Callback = () => void;
export default class Statistic extends BaseComponent {
  private container: BaseComponent;

  private lesson: Lessons;

  private continueClickCallback: Callback;

  constructor(container: BaseComponent, lesson: Lessons, missRounds: RoundType[], continueClickCallback: Callback){
    super({ tag: "div", className: classes.statistic });
    this.container = container;
    this.lesson = lesson;
    this.continueClickCallback = continueClickCallback;
    const pictureInformation = getPictureInformation(this.lesson.getCurrentLesson()?.levelData);
    const resultInformation = this.getResultInformation(this.lesson.getCurrentLesson()?.words, missRounds);
    this.appendChild([pictureInformation, resultInformation]);
    
  }

  public init(): void { 
    this.container.append(this);
  }


  

  private getResultInformation(words: RoundType[] | undefined, missRounds: RoundType[]): BaseComponent {
    const done = div({ className: classes.wrap });
    const miss = div({ className: classes.wrap });
    const elements: BaseComponent[] = [];
    if (missRounds.length) {
      const missElements = fillMissRounds(missRounds);
      if (missElements.length) {
        miss.appendChild(missElements);
        elements.push(miss);
      }
      
    }
    if (words && words.length) {
      const doneRounds = words.filter(word => !missRounds.includes(word));
      if (doneRounds.length) {
        const doneElements = fillDoneRounds(doneRounds);
        done.appendChild(doneElements);
        elements.push(done);
      }
    }
    const continueButton = Button({ textContent: 'Continue', onClick: this.onContinueClick, className: classes.continue });
    elements.push(continueButton);
    const result = div({ className: classes.resultWrap });
    result.appendChild(elements);
    return result;
  }



  private onContinueClick = (): void => {
    this.destroy();
    this.continueClickCallback();
  }
}

function getPictureInformation(tittle: TittleType | undefined): BaseComponent {
  return div({ className: classes.pictureWrap },
    img({ src: `${URL}images/${tittle?.cutSrc}`, alt: tittle?.name, className: classes.picture, width: 100, height: 60 }),
    div({ className: classes.infoWrap },
      p(classes.text!, tittle?.name || ''),
      p(classes.author!, `${tittle?.author}, ${tittle?.year}` || '')));
}

function fillMissRounds(missRounds: RoundType[]): BaseComponent[] {
  const tittle = div({ className: classes.tittleWrap },
    p(classes.text!, `I don't know`),
    span({ className: `${classes.count} ${classes.miss}`, textContent: `${missRounds.length}` }));
  const list: BaseComponent[] = missRounds.map(round => {
    const playButton = new Play();
    playButton.setFile(round.audioExample);
    const sentence = p(classes.text!, round.textExample);
    return div({ className: classes.sentence }, playButton, sentence)
  });
  return [tittle, ...list];
}

function fillDoneRounds(doneRounds: RoundType[]): BaseComponent[] {
  const tittle = div({ className: classes.tittleWrap },
    p(classes.text!, `I know`),
    span({ className: `${classes.count} ${classes.done}`, textContent: `${doneRounds.length}` }));
  const list: BaseComponent[] = doneRounds.map(round => {
    const playButton = new Play();
    playButton.setFile(round.audioExample);
    const sentence = p(classes.text!, round.textExample);
    return div({ className: classes.sentence }, playButton, sentence)
  });
  return [tittle, ...list];
}