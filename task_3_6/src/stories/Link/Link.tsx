import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './Link.module.css';

export interface LinkProps {
  children?: ReactNode;
  disabled?: boolean;
  href?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  disabled = false,
  href = '#',
}) => {
  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={classNames(styles.link, disabled && styles['link-disabled'])}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
};

export default Link;
