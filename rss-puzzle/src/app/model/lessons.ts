import type { LessonType} from "../utils/types";
import type Store from "../API/store";

export default class Lessons {
  private lessons: LessonType[] = [];

  private currentLesson: LessonType | null = null;

  private countRound: number = 0;

  private store: Store;

  constructor(data: LessonType[], store: Store) {
    this.lessons = data;
    this.store = store;
    this.getFormStore();
  
  }

  public getCurrentLesson(): LessonType | null {
    return this.currentLesson;
  }

  public getSentence(): string {
    if (this.currentLesson) {
      return this.currentLesson.words[this.countRound]?.textExample || '';
    }
    return '';
  }

  public getTranslate(): string {
    if (this.currentLesson) {
      return this.currentLesson.words[this.countRound]?.textExampleTranslate || '';
    }
    return '';
  }

  public getCountRound(): number {
    return this.countRound;
  }

  public setNextLevel(): void {
    if (this.currentLesson) {
      const nextLevel = this.lessons[this.lessons.indexOf(this.currentLesson) + 1];
      if (nextLevel) {
        this.currentLesson = nextLevel;
        this.countRound = 0;
        this.store.setLastLesson(nextLevel.levelData.id);
      }
    }
  }

  public setNextRound(): void {
    this.countRound += 1;
  }

  public getLessonLength(): number {
    return this.currentLesson?.words.length || 0;
  }

  private getLessonById(id: string): LessonType | null {
    return this.lessons.find((lesson) => lesson.levelData.id === id) || null;
  }

  private getFirstLesson(): LessonType | null {
    return this.lessons[0] || null;
  }

  private getFormStore(): void {
    const data = this.store.getLastLesson();
    let lesson = this.getFirstLesson();
    if (data) {
      lesson = this.getLessonById(data);
    } 
    if (lesson) {
      this.currentLesson = lesson;
    }
  }
}
