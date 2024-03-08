import { STORE_NAME, STORE_USER } from "@/constant";
import User from "../Entities/user";

export default class Store {
  private storage;
  private storeKey;

  constructor( ) {
    this.storage = window.localStorage;
    this.storeKey = STORE_NAME;
  }

  getUser() {
    return this.get<User>(STORE_USER);
  }

  setUser(user: User) {
    this.set<User>(STORE_USER, user);
  }

  removeUser() {
    this.storage.removeItem(`${this.storeKey}-${STORE_USER}`);
  }

  private set<T>(key: string, value: T) {
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
        const resultsData = JSON.parse(storedDataString) as T;
        return resultsData;
      } else return null;
    } catch (err: unknown) {
      return null;
    }
  }

  
}