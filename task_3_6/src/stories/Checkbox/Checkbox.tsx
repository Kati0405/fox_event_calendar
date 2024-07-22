import React from 'react';
import styled from 'styled-components';
import checkmark from '../../assets/svg/checkmark.svg';
import { ReactSVG } from 'react-svg';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid #323749;
  background-color: white;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  ${(props) =>
    props.checked &&
    `
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  `}

  ${(props) =>
    props.disabled &&
    `
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    cursor: not-allowed;
  `}

  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      border-color: var(--color-primary-hover);
    `}
  }

  &:active {
    ${(props) =>
      !props.disabled &&
      `
      background-color: var(--color-primary-active);
      border-color: var(--color-primary-active);
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
}) => (
  <CheckboxContainer>
    <HiddenCheckbox
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
    />
    <StyledCheckbox checked={checked} disabled={disabled}>
      {checked && <ReactSVG src={checkmark} />}
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
