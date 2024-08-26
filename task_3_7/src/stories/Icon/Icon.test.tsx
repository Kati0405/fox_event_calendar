import { render, screen } from '@testing-library/react';
import { FaBeer } from 'react-icons/fa';
import Icon from './Icon';

describe('Icon Component', () => {
  it('renders the icon component', () => {
    render(<Icon icon={FaBeer} />);
    expect(screen.getByTestId('icon-container')).toBeInTheDocument();
  });

  it('renders with default size and color', () => {
    render(<Icon icon={FaBeer} />);
    const iconElement = screen
      .getByTestId('icon-container')
      .querySelector('svg');

    expect(iconElement).toHaveStyle({
      width: '1em',
      height: '1em',
      color: 'currentColor',
    });
  });

  it('renders with custom size and color', () => {
    render(<Icon icon={FaBeer} size={2} color='rgb(255, 0, 0)' />);
    const iconElement = screen
      .getByTestId('icon-container')
      .querySelector('svg');

    expect(iconElement).toHaveStyle({
      width: '2em',
      height: '2em',
      color: 'rgb(255, 0, 0)',
    });
  });
});
