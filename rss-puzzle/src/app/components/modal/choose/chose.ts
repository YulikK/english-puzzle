import { BaseComponent } from "../../base-components.ts";
import Lessons from "@/app/model/lessons.ts";
import Button from "../../button/button.ts";
import { div, p, a, img } from "../../tags.ts";
import { URL } from "@/constant.ts";
import classes from "./chose.module.scss";

export default class Chose extends BaseComponent {
  private container: BaseComponent;
  private lessons: Lessons;
  private closeButton: BaseComponent;
  constructor(container: BaseComponent, lessons: Lessons) {
    super({ tag: "div", className: classes.chose });
    console.log('init');
    this.container = container;
    this.lessons = lessons
    this.closeButton = Button({ textContent: 'X', onClick: this.onCloseClick, className: classes.close });
    const lessonList = this.makeLessonList();
    this.appendChild([div({ className: classes.buttonWrap }, this.closeButton)]);
    this.appendChild(lessonList);
  }

  public init() {
    this.container.append(this);
  }

  private onCloseClick = () => {
    this.destroy();
  }

  private makeLessonList(): BaseComponent[] {
    const elements: BaseComponent[] = [];
    const lessons = this.lessons.getLessons();
    let currentLevel = '';
    let lessonsContainer: BaseComponent | null = null;
    lessons.forEach(lesson => {
      const levelId = lesson.levelData.id.split('_')[0];
      const lessonNumber = lesson.levelData.id.split('_')[1];
      if (levelId && levelId !== currentLevel) {
        currentLevel = levelId;
        const level = div({ className: classes.level }, p(classes.levelTittle!, `Level ${levelId}`));
        lessonsContainer = div({ className: classes.lessonsContainer });
        elements.push(level);
        elements.push(lessonsContainer);
      }
      if (lessonsContainer) {
        
        const lessonItem = a({ className: classes.lesson },
          img({ src: `${URL}images/${lesson.levelData.cutSrc}`, alt: `lesson ${lesson.levelData.id}`, className: classes.image, width: 90, height: 60 }),
          p(classes.lessonName!, `Lesson ${lessonNumber}`));
        lessonsContainer.appendChild([lessonItem]);
      }
      // const lessonButton = Button({ textContent: lesson.name, onClick: this.onLessonClick, className: classes.lesson});
      // elements.push(lessonButton);
    });
    return elements;
  }
}