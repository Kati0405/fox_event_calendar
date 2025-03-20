import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Link from './Link';

describe('Link Component', () => {
  it('renders the link with children', () => {
    render(<Link>Test Link</Link>);
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
  });

  it('has the correct href when not disabled', () => {
    render(<Link href='https://google.com'>Test Link</Link>);
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('href', 'https://google.com');
  });

  it('does not have an href when disabled', () => {
    render(
      <Link href='https://google.com' disabled>
        Disabled Link
      </Link>
    );
    const linkElement = screen.getByText('Disabled Link');
    expect(linkElement).not.toHaveAttribute('href', 'https://google.com');
    expect(linkElement).toHaveAttribute('aria-disabled', 'true');
  });

  it('has the correct styles when not disabled', () => {
    render(<Link>Styled Link</Link>);
    const linkElement = screen.getByText('Styled Link');
    expect(linkElement).toHaveStyle('color: var(--color-primary)');
    fireEvent.click(linkElement);
    expect(linkElement).toHaveStyle('color: var(--color-primary__pressed)');
  });

  it('has the correct styles when disabled', () => {
    render(<Link disabled>Disabled Link</Link>);
    const linkElement = screen.getByText('Disabled Link');
    expect(linkElement).toHaveStyle('color: #575d58');
    expect(linkElement).toHaveStyle('cursor: not-allowed');
    expect(linkElement).toHaveStyle('pointer-events: none');
  });

  it('does not respond to clicks when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Link href='https://google.com' disabled onClick={handleClick}>
        Disabled Link
      </Link>
    );
    const linkElement = screen.getByText('Disabled Link');
    fireEvent.click(linkElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('responds to clicks when not disabled', () => {
    const handleClick = vi.fn();
    render(
      <Link href='https://google.com' onClick={handleClick}>
        Active Link
      </Link>
    );
    const linkElement = screen.getByText('Active Link');
    fireEvent.click(linkElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
