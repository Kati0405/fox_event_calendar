import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Toast from './Toast';

describe('Toast Component', () => {
  it('renders with message', () => {
    render(<Toast message='This is a toast message' onClose={vi.fn()} />);

    expect(screen.getByText('This is a toast message')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Toast message='This is a toast message' onClose={handleClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders close button', () => {
    render(<Toast message='This is a toast message' onClose={vi.fn()} />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('role', 'button');
    expect(closeButton).toBeVisible();
  });
});
