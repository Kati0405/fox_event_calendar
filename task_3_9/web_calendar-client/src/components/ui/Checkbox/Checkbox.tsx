import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

import checkmark from 'src/assets/svg/checkmark.svg';
import { cn } from 'src/utils/utils';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{
  checked: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s, border-color 0.2s;

  ${({ disabled }) =>
    disabled &&
    `
      background-color: #e0e0e0;
      border-color: #e0e0e0;
    `}
`;

const CheckboxContainer = styled.label`
  display: inline-block;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  ariaLabel,
  className,
}) => {
  const combinedClassName = `${
    checked
      ? `${cn(`bg-${className}`)} checked`
      : `${cn(`border-${className}`)} border-2`
  }`;
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        role='checkbox'
        aria-label={ariaLabel}
        className={combinedClassName}
      >
        {checked && <ReactSVG src={checkmark} role='img' />}
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
