import { STORE_NAME, STORE_USER, STORE_OPTIONS, STORE_LAST_LESSON } from "@/constant.ts";
import type User from "../Entities/user.ts";
import { isUserType, isOptionsType } from "../utils/validation.ts";
import type { UserType , OptionsType } from "../utils/types.ts";

export default class Store {
  private storage;

  private storeKey;

  constructor( ) {
    this.storage = window.localStorage;
    this.storeKey = STORE_NAME;
  }

  public getUser(): UserType | null{
    const data = this.get(STORE_USER);
    if (isUserType(data)) {
      return data;
    }
    return null
  }

  public setUser(user: User): void{
    const data: UserType = {
      firstName: user.firstName,
      lastName: user.lastName
    }
    this.set<UserType>(STORE_USER, data);
  }

  public getOptions(): OptionsType | null {
    const data = this.get(STORE_OPTIONS);
    if (isOptionsType(data)) {
      return data;
    }
    return null
  }

  public setOptions(options: OptionsType): void {
    this.set<OptionsType>(STORE_OPTIONS, options);
  }

  public getLastLesson(): string | null {
    const data = this.get(STORE_LAST_LESSON);
    if (typeof data === "string") {
      return data;
    }
    return null
  }

  public setLastLesson(value: string): void {
    this.set<string>(STORE_LAST_LESSON, value);
  }

  public removeUser(): void {
    this.storage.removeItem(`${this.storeKey}-${STORE_USER}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_OPTIONS}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_LAST_LESSON}`);
  }

  private set<T>(key: string, value: T): void {
    this.storage.setItem(
      `${this.storeKey}-${key}`,
      JSON.stringify(value),
    );
  }

  private get(key: string): unknown{
    try {
      const storedDataString = this.storage.getItem(
        `${this.storeKey}-${key}`,
      );
      if (storedDataString) {
        return JSON.parse(storedDataString);
      }
      return null;
    } catch (err: unknown) {
      return null;
    }
  }

  
  
}