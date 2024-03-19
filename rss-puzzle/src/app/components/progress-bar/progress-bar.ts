import { BaseComponent } from "@/app/components/base-components.ts";
import { div, p } from "@/app/components/tags.ts";
import type Lessons from "@/app/model/lessons";
import type { Callback } from "@/app/utils/types";
import Chose from "../modal/choose/chose.ts";
import classes from "./progress-bar.module.scss";

export default class ProgressBar extends BaseComponent {
  private container: BaseComponent;

  private progressLine: BaseComponent;

  private progressCircle: BaseComponent;

  private level: BaseComponent;

  private round: BaseComponent;

  private lessons: Lessons;

  private chooseLessonCallback: Callback | null = null;

  constructor(container: BaseComponent, lesson: Lessons) {
    super({ tag: 'div', className: classes.progressWrapper }); 
    this.container = container;
    this.lessons = lesson;
    const levelNumber = this.lessons.getCurrentLesson()?.levelData.id.split('_')[0] || '';
    const lessonNumber = this.lessons.getCurrentLesson()?.levelData.id.split('_')[1] || '';
    const lessonCount = this.lessons.getCountLessonsInLevel(levelNumber);
    this.level = p(classes.level!, `Lvl ${levelNumber}`);
    this.round = p(classes.round!, `${lessonNumber} / ${lessonCount}`);
    this.progressCircle = div({ className: classes.progressCircle },
      div({ className: classes.progressInformation },
        this.level,
        this.round));
    this.progressLine = div({ className: classes.progressBar },
      this.progressCircle);
    this.appendChild([this.progressLine])
    
    this.container.append(this);
    this.progressCircle.getElement().addEventListener('click', this.onClick)
  }

  public setChooseLessonCallback(callback: Callback): void {
    this.chooseLessonCallback = callback;
  }

  private onChooseCallback = (): void =>{
    this.updateInfo();
    if (this.chooseLessonCallback) {
      this.chooseLessonCallback();
    }
    
  }

  public updateInfo(): void {
    const levelNumber = this.lessons.getCurrentLesson()?.levelData.id.split('_')[0] || '';
    const lessonNumber = this.lessons.getCurrentLesson()?.levelData.id.split('_')[1] || '';
    const lessonCount = this.lessons.getCountLessonsInLevel(levelNumber);
    this.level.getElement().textContent = `Lvl ${levelNumber}`;
    this.round.getElement().textContent = `${lessonNumber} / ${lessonCount}`;
  }

  public hide(): void {
    this.addClass(classes.hide!);
  }

  public show(): void {
    this.removeClass(classes.hide!);
  }

  private onClick = (): void => {
    const choseModal = new Chose(this.lessons, this.onChooseCallback);
    choseModal.init();
  }
  
}