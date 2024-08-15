import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';

export interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.div`
  width: auto;
  padding: 0.78125rem;
  font-family: var(--font-family-secondary);
  font-size: 0.9375rem;
  color: #323749;
  border: 1px solid #dedfe5;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--box-shadow-sm);

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

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
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
      <StyledInputWrapper>
        <StyledInput onClick={() => setShowOptions(!showOptions)}>
          {value || options[0]}
          <IoMdArrowDropdown />
        </StyledInput>
        {showOptions && (
          <OptionsList role='listbox'>
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

export default Dropdown;
