import React from 'react';
import styled from 'styled-components';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';

export interface CheckboxLabeledProps extends CheckboxProps {
  label: string;
}

const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LabelText = styled.span`
  font-size: 0.75em;
  margin-left: 8px;
`;

const CheckboxWithLabel: React.FC<CheckboxLabeledProps> = ({
  checked = false,
  label,
  onChange,
  disabled = false,
}) => {
  return (
    <LabelContainer>
      <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
      <LabelText>{label}</LabelText>
    </LabelContainer>
  );
};

export default CheckboxWithLabel;
