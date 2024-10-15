import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SelectMenu from './Select';

describe('SelectMenu Component', () => {
  const defaultProps = {
    label: 'Select an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and placeholder', () => {
    render(<SelectMenu {...defaultProps} />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('toggles options list visibility when input is clicked', () => {
    render(<SelectMenu {...defaultProps} />);

    const input = screen.getByText('Select...');
    fireEvent.click(input);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('closes options list when clicking outside', () => {
    render(<SelectMenu {...defaultProps} />);

    const input = screen.getByText('Select...');
    fireEvent.click(input);

    fireEvent.click(document.body);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('handles no options', () => {
    render(<SelectMenu {...defaultProps} options={[]} />);

    const input = screen.getByText('Select...');
    fireEvent.click(input);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('renders selected option when controlled by value prop', () => {
    const props = {
      ...defaultProps,
      value: 'Option 2',
    };

    render(<SelectMenu {...props} />);

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('selects an option and triggers onChange', () => {
    const handleChange = vi.fn();
    render(<SelectMenu {...defaultProps} onChange={handleChange} />);

    const input = screen.getByText('Select...');
    fireEvent.click(input);

    const option1 = screen.getByText('Option 1');
    expect(option1).toBeVisible();

    fireEvent.click(option1);

    expect(handleChange).toHaveBeenCalledWith('Option 1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
