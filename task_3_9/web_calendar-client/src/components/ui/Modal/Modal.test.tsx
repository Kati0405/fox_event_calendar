import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders with title and content', () => {
    render(
      <Modal title='Test Title' content='Test Content' onClose={mockOnClose} />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal title='Test Title' content='Test Content' onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the modal container', () => {
    render(
      <Modal title='Test Title' content='Test Content' onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByText('Test Content'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking the title', () => {
    render(
      <Modal title='Test Title' content='Test Content' onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByText('Test Title'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('closes when clicking outside the modal container', () => {
    render(
      <Modal title='Test Title' content='Test Content' onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
