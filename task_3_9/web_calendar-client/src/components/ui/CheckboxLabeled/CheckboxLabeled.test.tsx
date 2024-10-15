import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxWithLabel from './CheckboxLabeled';

describe('CheckboxWithLabel component', () => {
  it('renders with label text', () => {
    render(<CheckboxWithLabel label='Test Label' />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('calls onChange handler when checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<CheckboxWithLabel label='Test Label' onChange={handleChange} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays the label correctly', () => {
    render(<CheckboxWithLabel label='Sample Label' />);
    const labelText = screen.getByText(/Sample Label/i);
    expect(labelText).toBeInTheDocument();
  });

  it('does not call onChange handler when disabled', () => {
    const handleChange = vi.fn();
    render(
      <CheckboxWithLabel label='Test Label' onChange={handleChange} disabled />
    );
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
