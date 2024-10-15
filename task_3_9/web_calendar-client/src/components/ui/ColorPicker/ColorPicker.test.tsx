import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ColorPicker from './ColorPicker';

describe('ColorPicker Component', () => {
  const colors = ['#FF0000', '#00FF00', '#0000FF'];
  const selectedColor = '#FF0000';
  const handleChange = vi.fn();

  beforeAll(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --border-color: #dedfe5;
        --selected-border-color: #323749;
      }
    `;
    document.head.appendChild(style);
  });

  const getComputedStyleProperty = (element: HTMLElement, property: string) =>
    window.getComputedStyle(element).getPropertyValue(property);

  it('renders the title', () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        onChange={handleChange}
      />
    );
    expect(screen.getByText('Colour')).toBeInTheDocument();
  });

  it('renders all color swatches', () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        onChange={handleChange}
      />
    );
    const swatches = screen.getAllByRole('button');
    expect(swatches).toHaveLength(colors.length);
  });

  it('highlights the selected color', () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        onChange={handleChange}
      />
    );
    const selectedSwatch = screen.getByTestId(`color-swatch-${selectedColor}`);
    const expectedBorderColor = getComputedStyleProperty(
      document.documentElement,
      '--selected-border-color'
    );
    expect(selectedSwatch.parentElement).toHaveStyle(
      `border: 1px solid ${expectedBorderColor}`
    );
  });

  it('calls onChange with the correct color when a swatch is clicked', () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        onChange={handleChange}
      />
    );
    const swatch = screen.getByTestId('color-swatch-#00FF00');
    fireEvent.click(swatch);
    expect(handleChange).toHaveBeenCalledWith('#00FF00');
  });

  it('does not highlight unselected colors', () => {
    render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        onChange={handleChange}
      />
    );
    const unselectedSwatch = screen.getByTestId('color-swatch-#00FF00');
    expect(unselectedSwatch.parentElement).toHaveStyle(
      'border: 1px solid transparent'
    );
  });
});
