import { ReactNode } from 'react';
import { options } from './constants';

import styles from './Card.module.css';
import classNames from 'classnames';

export interface CardProps {
  children?: ReactNode;
  color?: (typeof options.colors)[number];
  size?: (typeof options.sizes)[number];
  isClickable?: boolean;
  isDraggable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  color = 'primary',
  size = 'sm',
  isClickable,
  isDraggable,
}) => {
  return (
    <div
      className={classNames(styles.card, {
        [styles[`color-${color}`]]: color,
        [styles[`size-${size}`]]: size,
        [styles['is-clickable']]: isClickable,
        [styles['is-draggable']]: isDraggable,
      })}
    >
      {children}
    </div>
  );
};

export default Card;
