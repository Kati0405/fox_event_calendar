import styled from 'styled-components';
import { ButtonProps } from './Button';

export const StyledButton = styled.button<ButtonProps>`
    border: ${({ primary }) => (primary ? '1px solid #00AE1C' : '1px solid #DEDFE5')};
    border-radius: 0.5em;
    background-color: ${({ primary }) => (primary ? '#00AE1C' : '#FFFFFF')};
    color: ${({ primary }) => (primary ? '#FFFFFF' : '#323749')};
    font-size: 0.9375em;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.78125em 0.625em;

&:hover {
    background-color: ${({ primary }) => (primary ? '#00AE1C' : '#EFEFEF')};
    border: ${({ primary }) => (primary ? '1px solid #5CE171' : '1px solid #DEDFE5')};
    box-shadow: ${({ primary }) => (primary ? '0px 2px 2px 0px #5CE17140' : '0px 1px 2px 0px #45454540')};
}

&:disabled {
    border: ${({ primary }) => (primary ? '1px solid #00AE1C' : '1px solid #8D8E91')};
    background-color: ${({ primary }) => (primary ? '#187727' : '#C8C8C8')};
    color: ${({ primary }) => (primary ? '#B9B9B9' : '#737373')};
    cursor: not-allowed;

    &:hover {
        box-shadow: none;
    }
}

&:active {
    border: ${({ primary }) => (primary ? '1px solid #5CE171' : '1px solid #DEDFE5')};
    background-color: ${({ primary }) => (primary ? '#0cd52b' : '#E0E0E0')};
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