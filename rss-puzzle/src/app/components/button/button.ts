import { Abstract } from '../abstract-components';

import styles from './button.module.scss';

interface Props {
  textContent: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({textContent, onClick, className }: Props) =>
  new Abstract({
    tag: 'button',
    className: `${styles.button} ${className || ''}`,
    textContent,
    onclick: (PreventDefault: Event) => {
      PreventDefault.preventDefault();
      onClick?.();
    },
  });