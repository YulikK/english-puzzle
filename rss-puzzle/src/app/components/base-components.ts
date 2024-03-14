export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName '>
  > & {
  type?: string;
  htmlFor?: T extends HTMLLabelElement ? string : never;
  checked?: T extends HTMLInputElement ? boolean : never;
  id?: string;
  placeholder?: string;
  tag: keyof HTMLElementTagNameMap;
};

export type ElementProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T;

  protected child: BaseComponent[] = [];

  constructor(props: Props<T>, ...child: BaseComponent[]) {
    this.element = document.createElement(props.tag) as T;
    Object.assign(this.element, props);
    if (child) {
      this.appendChild(child);
    }
  }
  
  public append(child: BaseComponent): void {
      this.child.push(child);
      this.element.append(child.getElement());
  }
  
  public appendChild(child: BaseComponent[]): void {
    child.forEach((el) => {
      this.append(el);
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getChildren(): BaseComponent[] {
    return this.child;
  }

  public destroy(): void {
    this.destroyChild();
    this.element.remove();
  }

  public clear(): void {
    this.element.innerHTML = '';
  }

  public destroyChild(): void {
    this.child.forEach(child => child.destroy());
    this.child = [];
  }

  public clearChild(): void {
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