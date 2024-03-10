import Store from "../API/store";
export default class User {
  public firstName: string = '';
  public lastName: string = '';
  private store: Store;
  constructor(store: Store) {
    this.store = store;
    const savedUser = this.store.getUser();
    if (savedUser) {
      this.setName(savedUser.firstName, savedUser.lastName, false);
    }
  }
  public setName(firstName: string, lastName: string, toStore: boolean = true): void {
    this.firstName = firstName;
    this.lastName = lastName;
    if (toStore) {
      this.store.setUser(this);
    }
  }
  
  public getFullName() {
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