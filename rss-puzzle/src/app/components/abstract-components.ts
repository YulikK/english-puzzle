export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName '>
  > & {
  type?: string;
  placeholder?: string;
  tag: keyof HTMLElementTagNameMap;
};

export type ElementProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class Abstract<T extends HTMLElement = HTMLElement> {
  protected element: T;
  protected child: Abstract[] = [];

  constructor(props: Props<T>, ...child: Abstract[]) {
    this.element = <T>document.createElement(props.tag);
    Object.assign(this.element, props);
    if (child) {
      this.appendChild(child);
    }
  }
  
  public append(child: Abstract): void {
      this.child.push(child);
      this.element.append(child.getElement());
  }
  
  public appendChild(child: Abstract[]): void {
    child.forEach((el) => {
      this.append(el);
    });
  }

  public getElement() {
    return this.element;
  }

  public destroy(): void {
    this.destroyChild();
    this.element.remove();
  }

  public destroyChild(): void {
    this.child.forEach(child => child.destroy());
    this.child = [];
  }

  public getValue(): string {
    let value = '';
    if (this.element instanceof HTMLInputElement) {
      value = this.element.value.trim();
    };
    return value;
  }

  public addClass(classNameClassName: string): void {
    this.element.classList.add(classNameClassName);
  }

  public toggleClass(classSurname: string): void {
    this.element.classList.toggle(classSurname);
  }

  public removeClass(className: string): void {
    this.element.classList.remove(className);
  }
}