import type { LessonType, RoundType} from "../utils/types";
import type Store from "../API/store";

export default class Lessons {
  private lessons: LessonType[] = [];

  private currentLesson: LessonType | null = null;

  private history: LessonType[] = [];

  private countRound = 0;

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

  public getCurrentRound(): RoundType | undefined {
    return this.currentLesson?.words[this.countRound];
  }

  public getTranslate(): string {
    if (this.currentLesson) {
      return this.currentLesson.words[this.countRound]?.textExampleTranslate || '';
    }
    return '';
  }

  public getAudioFile(): string {
    if (this.currentLesson) {
      return this.currentLesson.words[this.countRound]?.audioExample || '';
    }
    return '';
  }

  public resetProgress(): void {
    this.currentLesson = this.getFirstLesson();
    this.countRound = 0;
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

  public setLesson(id: string): void {
    const lesson = this.getLessonById(id);
    if (lesson) {
      this.currentLesson = lesson;
      this.countRound = 0;
      this.store.setLastLesson(id);
    }
  }
  
  public addToHistory(): void {
    if (this.currentLesson) {
      this.history.push(this.currentLesson);
      this.store.setHistory(this.history);
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

    const history = this.store.getHistory();
    if (history) {
      this.history = history;
    }
  }

  public getLessons(): LessonType[] {
    return this.lessons;
  }

  public getHistory(): LessonType[] {
    return this.history;
  }
}
