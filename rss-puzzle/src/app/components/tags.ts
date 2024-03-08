import { Abstract, ElementProps } from "./abstract-components";

export const div = (props: ElementProps<HTMLDivElement>, ...children: Abstract[]) =>
  new Abstract<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

export const h1 = (className: string, textContent: string): Abstract<HTMLElementTagNameMap['h1']> =>
  new Abstract({ tag: 'h1', className, textContent });

export const h2 = (className: string, textContent: string): Abstract<HTMLElementTagNameMap['h2']> =>
  new Abstract({ tag: 'h2', className, textContent });

export const p = (className: string, textContent: string): Abstract<HTMLElementTagNameMap['h1']> =>
  new Abstract({ tag: 'p', className, textContent });

export const img = ({ src = '', alt = '', className = '' }) =>
  new Abstract<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
  });

  export const a = (props: ElementProps<HTMLLinkElement>, ...children: Abstract[]) =>
  new Abstract<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);