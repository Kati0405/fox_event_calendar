import classNames from 'classnames';
import styles from './CheckboxLabeled.module.css';

import checkmark from '../../assets/svg/checkmark.svg';
import { ReactSVG } from 'react-svg';

export interface CheckboxWithLabelProps {
  checked?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  checked = false,
  label,
  onChange,
}) => {
  return (
    <label className={styles.label}>
      <div
        className={classNames(styles.checkbox, checked && styles.checked)}
        onClick={() => onChange?.(!checked)}
      >
        {checked && <ReactSVG src={checkmark} />}
      </div>
      <span className={styles.text}>{label}</span>
    </label>
  );
};

export default CheckboxWithLabel;
