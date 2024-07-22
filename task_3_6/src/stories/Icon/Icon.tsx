import React from 'react';
import styled, { css } from 'styled-components';
import { IconType } from 'react-icons';

export interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
}

const StyledIcon = styled.span<{ size?: number; color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ size, color }) => css`
    svg {
      width: ${size || 1}em;
      height: ${size || 1}em;
      color: ${color || 'currentColor'};
    }
  `}
`;

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size, color }) => {
  return (
    <StyledIcon size={size} color={color}>
      <IconComponent />
    </StyledIcon>
  );
};

export default Icon;
