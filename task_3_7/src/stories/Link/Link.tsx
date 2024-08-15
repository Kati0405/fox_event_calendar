import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface LinkProps {
  children?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const StyledLink = styled.a<{ disabled?: boolean }>`
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9375em;
  font-weight: bolder;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: var(--color-primary__pressed);
    text-decoration: underline;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #575d58;
      cursor: not-allowed;
      pointer-events: none;

      &:hover {
        text-decoration: none;
      }
    `}
`;

const Link: React.FC<LinkProps> = ({
  children,
  disabled = false,
  href = '#',
  onClick,
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick?.(event);
    }
  };
  return (
    <StyledLink
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
