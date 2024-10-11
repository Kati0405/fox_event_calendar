import styled from 'styled-components';
import checkmark from '../../assets/checkmark.svg';
import { ReactSVG } from 'react-svg';
import { theme } from '../../theme';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  color?: string;
}

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{
  checked: boolean;
  disabled: boolean;
  color?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem;
  border: 3px solid ${({ color }) => color || '#323749'};
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  ${({ checked, color }) =>
    checked &&
    `
    background-color: ${color || theme.colors.color_primary};
    border-color: ${color || theme.colors.color_primary};
  `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    cursor: not-allowed;
  `}

  &:hover {
    ${({ disabled, color }) =>
      !disabled &&
      `
      border-color: ${color || theme.colors.border_color};
    `}
  }

  &:active {
    ${({ disabled, color }) =>
      !disabled &&
      `
      background-color: ${color || theme.colors.color_secondary};
      border-color: ${color || theme.colors.border_color};
    `}
  }
`;

const CheckboxContainer = styled.label`
  display: inline-block;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  ariaLabel,
  color,
}) => (
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
      color={color}
    >
      {checked && <ReactSVG src={checkmark} role='img' />}
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
