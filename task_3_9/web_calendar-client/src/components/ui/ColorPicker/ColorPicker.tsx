import { cn } from '@/utils/utils';
import styled from 'styled-components';

export interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const Title = styled.h6`
  font-family: var(--font-family-secondary);
  font-size: 0.62rem;
  color: var(--border-color);
  font-weight: bolder;
`;

const Palette = styled.div`
  width: 14.375rem;
  border: 1px solid #dedfe5;
  padding: 0.4375rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
`;

const ColorSwatchWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 15%;
  background-color: white;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid #323749' : '1px solid transparent'};
`;

const ColorSwatch = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 15%;
  cursor: pointer;
`;

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onChange,
}) => {
  return (
    <div className='flex flex-col gap-3 mb-4'>
      <Title>Colour</Title>
      <Palette>
        {colors.map((color) => (
          <ColorSwatchWrapper key={color} isSelected={color === selectedColor}>
            <ColorSwatch
              className={cn(`bg-${color}`)}
              role='button'
              onClick={() => onChange(color)}
              data-testid={`color-swatch-${color}`}
            />
          </ColorSwatchWrapper>
        ))}
      </Palette>
    </div>
  );
};

export default ColorPicker;
