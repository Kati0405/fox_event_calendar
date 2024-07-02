import { MouseEventHandler, ReactNode } from 'react';
import { IconWrapper, StyledButton } from './Button.styled';

export interface ButtonProps {
  primary: boolean;
  disabled: boolean;
  children: ReactNode;
  icon?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  disabled,
  children,
  icon,
}) => {
  return (
    <StyledButton primary={primary} disabled={disabled}>
      {icon && (
        <IconWrapper>
          <img src={icon} alt='icon' />
        </IconWrapper>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;
