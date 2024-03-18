import { BaseComponent } from "@/app/components/base-components.ts";
import { div, p } from "@/app/components/tags.ts";
import type Lessons from "@/app/model/lessons";
import type { Callback } from "@/app/utils/types";
import Chose from "../modal/choose/chose.ts";
import classes from "./progress-bar.module.scss";

export default class ProgressBar extends BaseComponent {
  private container: BaseComponent;

  private progressLine: BaseComponent;

  private level: BaseComponent;

  private round: BaseComponent;

  private lessons: Lessons;

  private chooseLessonCallback: Callback | null = null;

  constructor(container: BaseComponent, lesson: Lessons) {
    super({ tag: 'div', className: classes.progressWrapper }); 
    this.container = container;
    this.lessons = lesson;
    this.level = p(classes.level!, 'Lvl 1');
    this.round = p(classes.round!, '10 / 42');
    this.progressLine = div({ className: classes.progressBar },
      div({ className: classes.progressCircle },
        div({ className: classes.progressInformation },
          this.level,
          this.round))
    );
    this.appendChild([this.progressLine])
    
    this.container.append(this);
    this.getElement().addEventListener('click', this.onClick)
  }

  public setChooseLessonCallback(callback: Callback): void {
    this.chooseLessonCallback = callback;
  }

  public hide(): void {
    this.addClass(classes.hide!);
  }

  public show(): void {
    this.removeClass(classes.hide!);
  }

  private onClick = (): void => {
    const choseModal = new Chose(this.container, this.lessons, this.chooseLessonCallback);
    choseModal.init();
  }
  
}