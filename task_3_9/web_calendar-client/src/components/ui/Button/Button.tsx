import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonState {
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonState;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants = {
  [ButtonState.Primary]: css`
    border: 1px solid #00ae1c;
    background-color: #00ae1c;
    color: #ffffff;

    &:hover {
      background-color: #00ae1c;
      border: 1px solid #5ce171;
      box-shadow: 0px 2px 2px 0px #5ce17140;
    }

    &:disabled {
      border: 1px solid #00ae1c;
      background-color: #187727;
      color: #b9b9b9;
    }

    &:active {
      border: 1px solid #5ce171;
      background-color: #0cd52b;
    }
  `,

  [ButtonState.Secondary]: css`
    border: 1px solid #dedfe5;
    background-color: #ffffff;
    color: #323749;

    &:hover {
      background-color: #efefef;
      border: 1px solid #dedfe5;
      box-shadow: 0px 1px 2px 0px #45454540;
    }

    &:disabled {
      border: 1px solid #8d8e91;
      background-color: #c8c8c8;
      color: #737373;
    }

    &:active {
      border: 1px solid #dedfe5;
      background-color: #e0e0e0;
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonState;
  className?: string;
}>`
  border-radius: 0.5em;
  font-size: 0.9375em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.78125em 0.625em;
  background: transparent;

  ${({ $variant }) =>
    buttonVariants[$variant] || buttonVariants[ButtonState.Primary]}

  &:disabled {
    cursor: not-allowed;

    &:hover {
      box-shadow: none;
    }
  }
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  margin-right: 0.5em;
  align-items: center;

  img {
    width: 1em;
    height: 1em;
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonState.Primary,
  disabled = false,
  icon,
  onClick,
  ariaLabel,
  className,
  type = 'button',
}) => (
  <StyledButton
    $variant={variant}
    disabled={disabled}
    onClick={onClick}
    aria-label={ariaLabel}
    aria-disabled={disabled}
    className={className}
    type={type}
  >
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </StyledButton>
);

export default Button;
