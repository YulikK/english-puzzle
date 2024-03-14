import { STORE_NAME, STORE_USER, STORE_OPTIONS } from "@/constant.ts";
import type User from "../Entities/user.ts";
import type { OptionsType } from "../utils/types.ts";

export default class Store {
  private storage;

  private storeKey;

  constructor( ) {
    this.storage = window.localStorage;
    this.storeKey = STORE_NAME;
  }

  public getUser(): User | null{
    return this.get<User>(STORE_USER);
  }

  public setUser(user: User): void{
    this.set<User>(STORE_USER, user);
  }

  public getOptions(): OptionsType | null {
    return this.get<OptionsType>(STORE_OPTIONS);
  }

  public setOptions(options: OptionsType): void {
    this.set<OptionsType>(STORE_OPTIONS, options);
  }

  public removeUser(): void {
    this.storage.removeItem(`${this.storeKey}-${STORE_USER}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_OPTIONS}`);
  }

  private set<T>(key: string, value: T): void {
    this.storage.setItem(
      `${this.storeKey}-${key}`,
      JSON.stringify(value),
    );
  }

  private get<T>(key: string): T | null {
    try {
      const storedDataString = this.storage.getItem(
        `${this.storeKey}-${key}`,
      );
      if (storedDataString) {
        const resultsData = JSON.parse(storedDataString);
        return resultsData;
      }
      return null;
    } catch (err: unknown) {
      return null;
    }
  }

  
}