import { BaseComponent, ElementProps } from "./base-components";

export const div = (props: ElementProps<HTMLDivElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

export const h1 = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'h1', className, textContent });

export const h2 = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h2']> =>
  new BaseComponent({ tag: 'h2', className, textContent });

export const p = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'p', className, textContent });

export const img = ({ src = '', alt = '', className = '' }) =>
  new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
  });

export const a = (props: ElementProps<HTMLLinkElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

export const aside = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLElement>({ ...props, tag: 'aside' }, ...children);

export const label = (props: ElementProps, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'label' }, ...children);