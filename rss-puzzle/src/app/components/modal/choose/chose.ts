import type Lessons from "@/app/model/lessons.ts";
import type { LessonType, Callback } from "@/app/utils/types.ts";
import { URL } from "@/constant.ts";
import { BaseComponent } from "../../base-components.ts";
import Button from "../../button/button.ts";
import { div, p, a, img } from "../../tags.ts";
import classes from "./chose.module.scss";

export default class Chose extends BaseComponent {
  private container: HTMLElement;

  private lessons: Lessons;

  private closeButton: BaseComponent;

  private callback: Callback | null = null;

  constructor(lessons: Lessons, callback: Callback | null) {
    super({ tag: "div", className: classes.background });
    this.container = document.body;
    this.lessons = lessons
    this.callback = callback;
    this.closeButton = Button({ textContent: 'X', onClick: this.onCloseClick, className: classes.close });
    const lessonList = this.makeLessonList();
    const modal = div({ className: classes.chose });
    modal.appendChild([div({ className: classes.buttonWrap },
      this.closeButton)]);
    modal.appendChild(lessonList);
    this.appendChild([modal]);
  }

  public init(): void {
    this.container.append(this.getElement());
  }


  private onCloseClick = (): void => {
    this.destroy();
  }

  private makeLessonList(): BaseComponent[] {
    const elements: BaseComponent[] = [];
    const lessons: LessonType[] = this.lessons.getLessons();
    const history: LessonType[] = this.lessons.getHistory();
    let currentLevel = '';
    let lessonsContainer: BaseComponent | null = null;
    lessons.forEach(lesson => {
      const levelId = lesson.levelData.id.split('_')[0];
      const lessonNumber = lesson.levelData.id.split('_')[1];
      if (levelId && levelId !== currentLevel) {
        currentLevel = levelId;
        const level = div({ className: classes.level }, p(classes.levelTittle!, `Level ${levelId}`));
        lessonsContainer = div({ className: classes.lessonsContainer});
        elements.push(level);
        elements.push(lessonsContainer);
      }
      if (lessonsContainer) {
        const isDone = history.find(historyLesson =>  historyLesson.levelData.id === lesson.levelData.id);
        const lessonItem = a({ className: classes.lesson },
          isDone
            ? img({ src: `${URL}images/${lesson.levelData.cutSrc}`, alt: `lesson ${lesson.levelData.id}`, className: classes.image, width: 90, height: 60 })
            : img({ src: `img/no-img.png`, alt: `lesson ${lesson.levelData.id}`, className: classes.noImage, width: 50, height: 50 }),
          p(classes.lessonName!, `Lesson ${lessonNumber}`));
          lessonItem.getElement().dataset.lvlId = lesson.levelData.id;
          lessonItem.getElement().addEventListener('click', this.onLessonClick);
        lessonsContainer.appendChild([lessonItem]);
      }
    });
    return elements;
  }

  private onLessonClick = (evt: Event): void => {
    const target = evt.currentTarget;
    if (target instanceof HTMLElement && target.classList.contains(classes.lesson!)) {
      const lessonId = target.dataset.lvlId;
      if (lessonId) {
        this.lessons.setLesson(lessonId);
        this.destroy();
        if (this.callback) {
          this.callback();
        }
      }
    }
  }
}