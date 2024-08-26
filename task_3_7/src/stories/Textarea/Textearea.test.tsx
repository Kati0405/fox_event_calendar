import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Textarea from './Textarea';

describe('Textarea Component', () => {
  it('renders with label', () => {
    render(<Textarea label='Textarea' />);

    expect(screen.getByText('Textarea')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Textarea label='Textarea' error='This field is required' />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(<Textarea label='Textarea' error='This field is required' />);

    const textarea = screen.getByLabelText('Textarea');
    expect(textarea).toHaveStyle('border-bottom: 1px solid #ff4d4f');
  });

  it('handles input', () => {
    render(<Textarea label='Textarea' />);

    const textarea = screen.getByLabelText('Textarea');
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    expect(textarea).toHaveValue('Test input');
  });
});
