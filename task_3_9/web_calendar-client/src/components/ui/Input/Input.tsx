import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  type?: 'text' | 'password';
  className?: string;
}

const inputStates = {
  default: css`
    border-bottom: 1px solid #737373;
    background-color: transparent;
  `,
  filled: css`
    border-bottom: 1px solid #737373;
  `,
  active: css`
    border-bottom: 1px solid #323749;
  `,
  disabled: css`
    border-bottom: 1px solid #737373;
    background-color: transparent;
    cursor: not-allowed;
  `,
  error: css`
    border-bottom: 1px solid #ff5620;
  `,
};

const Label = styled.label`
  font-family: var(--font-family-secondary);
  font-size: 0.625rem;
  color: #323749;
  display: block;
  margin-bottom: 0.4375rem;
  font-weight: bold;
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{
  hasError?: boolean;
  disabled?: boolean;
  $isFilled?: boolean;
  $isActive?: boolean;
}>`
  width: 100%;
  padding: 0.375rem 0;
  font-family: var(--font-family-secondary);
  font-size: 0.9375rem;
  border: none;
  border-bottom: 1px solid;

  ${({ disabled, hasError, $isFilled, $isActive }) => {
    if (disabled) return inputStates.disabled;
    if (hasError) return inputStates.error;
    if ($isActive) return inputStates.active;
    if ($isFilled) return inputStates.filled;
    return inputStates.default;
  }}

  &:focus {
    outline: none;
    ${({ hasError }) => !hasError && inputStates.active}
  }
`;

const ErrorMessage = styled.div`
  color: #ff5620;
  font-size: 0.625rem;
  margin-top: 0.25rem;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  hasError,
  errorMessage,
  type = 'text',
  className,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputContainer>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInputWrapper>
        <StyledInput
          id={inputId}
          type={showPassword && type === 'password' ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          hasError={hasError}
          $isFilled={value !== ''}
          $isActive={isActive}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className={className}
        />
        {type === 'password' && (
          <ToggleButton
            onClick={handleTogglePassword}
            aria-label='Toggle password visibility'
          >
            {showPassword ? <FaEye /> : <RiEyeCloseLine />}
          </ToggleButton>
        )}
      </StyledInputWrapper>
      {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
