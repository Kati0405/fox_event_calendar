import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Input from './Input';

describe('Input Component', () => {
  const defaultProps = {
    label: 'Your Label',
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and placeholder', () => {
    render(<Input {...defaultProps} placeholder='Your placeholder' />);

    expect(screen.getByLabelText('Your Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your placeholder')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByLabelText('Your Label');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('New Value');
  });

  it('shows error message when hasError is true', () => {
    render(
      <Input
        {...defaultProps}
        hasError={true}
        errorMessage='This is an error'
      />
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Label')).toHaveStyle(
      'border-bottom: 1px solid #ff5620'
    );
  });

  it('does not show error message when hasError is false', () => {
    render(<Input {...defaultProps} hasError={false} />);

    expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
  });

  it('toggles password visibility when icon is clicked', () => {
    render(<Input {...defaultProps} type='password' />);

    const toggleButton = screen.getByRole('button');
    expect(screen.getByLabelText('Your Label')).toHaveAttribute(
      'type',
      'password'
    );

    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Your Label')).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Your Label')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('disables input when disabled prop is true', () => {
    render(<Input {...defaultProps} disabled={true} />);

    const input = screen.getByLabelText('Your Label');
    expect(input).toBeDisabled();
  });
});
