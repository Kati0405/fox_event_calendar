import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

import { options } from './constants';

export interface ButtonProps {
  children?: ReactNode;
  variant?: (typeof options.variants)[number];
  disabled?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  icon = false,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        variant === 'primary' && styles['button-primary'],
        variant === 'secondary' && styles['button-secondary'],
        disabled && styles['button-disabled']
      )}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
