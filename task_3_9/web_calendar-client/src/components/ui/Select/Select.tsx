import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface SelectMenuProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

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

const StyledInput = styled.div<{
  isFilled?: boolean;
  isActive?: boolean;
}>`
  width: 100%;
  padding: 0.375rem 0;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #323749;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.25rem;
  border: 1px solid #dee0e5;
  border-radius: 0.5rem;
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: var(--box-shadow-sm);
`;

const OptionItem = styled.li`
  padding: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <InputContainer ref={containerRef}>
      <Label>{label}</Label>
      <StyledInputWrapper>
        <StyledInput
          onClick={() => setShowOptions(!showOptions)}
          isActive={isActive}
          isFilled={value !== ''}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        >
          {value || 'Select...'}
        </StyledInput>
        {showOptions && (
          <OptionsList>
            {options.map((option, index) => (
              <OptionItem
                key={index}
                onClick={() => {
                  onChange(option);
                  setShowOptions(false);
                }}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </StyledInputWrapper>
    </InputContainer>
  );
};

export default SelectMenu;
