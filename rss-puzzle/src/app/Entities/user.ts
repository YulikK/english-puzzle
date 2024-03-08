export default class User {
  public firstName: string;
  public lastName: string;
  constructor() {
    this.firstName = '';
    this.lastName = '';
  }
  public setName(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
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