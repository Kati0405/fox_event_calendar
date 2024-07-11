import React from 'react';
import classNames from 'classnames';
import styles from './Checkbox.module.css';

import checkmark from '../../assets/svg/checkmark.svg';
import { ReactSVG } from 'react-svg';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange }) => {
  return (
    <div
      className={classNames(styles.checkbox, checked && styles.checked)}
      onClick={() => onChange?.(!checked)}
    >
      {checked && <ReactSVG src={checkmark} />}
    </div>
  );
};

export default Checkbox;
