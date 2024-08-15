import { TextareaHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.625em;
  color: #323749;
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

const textareaStyles = css<{ hasError?: boolean }>`
  width: 100%;
  padding-top: 0.5rem;
  font-size: 0.9375em;
  font-family: var(--font-family-sans);
  border: none;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? '#ff4d4f' : '#323749')};
  background-color: white;
  transition: border-color 0.2s;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea<{ hasError?: boolean }>`
  ${textareaStyles}
`;

const ErrorMessage = styled.span`
  color: #ff4d4f;
  font-size: 0.75em;
  margin-top: 0.25rem;
`;

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className,
  ...props
}) => (
  <Wrapper>
    <Label>{label}</Label>
    <StyledTextarea
      className={className}
      hasError={!!error}
      aria-label={label}
      {...props}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Wrapper>
);

export default Textarea;
