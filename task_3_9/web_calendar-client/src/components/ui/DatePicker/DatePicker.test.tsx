import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePickerComponent from './DatePicker';

describe('DatePickerComponent', () => {
  it('renders the date picker component', () => {
    render(<DatePickerComponent />);
    expect(screen.getByPlaceholderText('Select Date')).toBeInTheDocument();
  });

  it('allows the user to select a date', () => {
    render(<DatePickerComponent />);
    const datePickerInput = screen.getByPlaceholderText('Select Date');
    fireEvent.focus(datePickerInput);
    const dayToSelect = screen.getByText('15');
    fireEvent.click(dayToSelect);
    expect(datePickerInput).toHaveValue('15 August 2024');
  });

  it('clears the selected date when null is passed', () => {
    render(<DatePickerComponent />);
    const datePickerInput = screen.getByPlaceholderText('Select Date');
    fireEvent.focus(datePickerInput);
    const dayToSelect = screen.getByText('15');
    fireEvent.click(dayToSelect);
    expect(datePickerInput).toHaveValue('15 August 2024');
    fireEvent.change(datePickerInput, { target: { value: '' } });
    expect(datePickerInput).toHaveValue('');
  });
});
