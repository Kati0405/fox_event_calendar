import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Dropdown, { DropdownProps } from './Dropdown';

describe('Dropdown Component', () => {
  const defaultProps: DropdownProps = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: '',
    onChange: vi.fn(),
  };

  it('renders the dropdown with default text', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText(defaultProps.options[0])).toBeInTheDocument();
  });

  it('displays the options list when clicked', async () => {
    render(<Dropdown {...defaultProps} />);
    const dropdownInput = screen.getByText(defaultProps.options[0]);

    fireEvent.click(dropdownInput);

    await waitFor(() => {
      const optionsList = screen.getByRole('listbox');
      const options = within(optionsList).getAllByRole('listitem');
      expect(options).toHaveLength(defaultProps.options.length);
    });
  });

  it('calls onChange with the selected option', () => {
    const handleChange = vi.fn();
    render(<Dropdown {...defaultProps} onChange={handleChange} />);

    const dropdownInput = screen.getByText(defaultProps.options[0]);
    fireEvent.click(dropdownInput);

    const optionToSelect = screen.getByText('Option 2');
    fireEvent.click(optionToSelect);

    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('closes the options list when an option is selected', async () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownInput = screen.getByText(defaultProps.options[0]);
    fireEvent.click(dropdownInput);

    const optionToSelect = screen.getByText('Option 2');
    fireEvent.click(optionToSelect);

    await waitFor(() => {
      const optionsList = screen.queryByRole('listbox');
      expect(optionsList).not.toBeInTheDocument();
    });
  });
});
