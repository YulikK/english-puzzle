import type { ElementProps } from "./base-components.ts";
import { BaseComponent } from "./base-components.ts";

export const div = (props: ElementProps<HTMLDivElement>, ...children: BaseComponent[]): BaseComponent<HTMLDivElement> =>
  new BaseComponent<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

export const h1 = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'h1', className, textContent });

export const h2 = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h2']> =>
  new BaseComponent({ tag: 'h2', className, textContent });

export const p = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'p', className, textContent });

export const img = ({ src = '', alt = '', className = '', width = 0, height = 0 }): BaseComponent<HTMLElementTagNameMap['img']> =>
  new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
    width,
    height
  });

export const a = (props: ElementProps<HTMLLinkElement>, ...children: BaseComponent[]): BaseComponent<HTMLLinkElement> =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

export const label = (props: ElementProps, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);

export const span = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'span' }, ...children);
