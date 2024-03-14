import type Store from "../API/store.ts";

export default class User {
  public firstName = '';

  public lastName = '';

  private store: Store;

  constructor(store: Store) {
    this.store = store;
    const savedUser = this.store.getUser();
    if (savedUser) {
      this.setName(savedUser.firstName, savedUser.lastName, false);
    }
  }

  public setName(firstName: string, lastName: string, toStore = true): void {
    this.firstName = firstName;
    this.lastName = lastName;
    if (toStore) {
      this.store.setUser(this);
    }
  }
  
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
  public isEmpty(): boolean {
    return this.firstName === '' && this.lastName === '';
  }

  public clear(): void {
    this.firstName = '';
    this.lastName = '';
  }
}