import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

export interface DatePickerComponentProps {
  onDateChange: (date: Date | null) => void;
  initialDate?: Date | null;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onDateChange,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  return (
    <div className='date-picker-container'>
      <label htmlFor='date-picker' className='date-picker-label'>
        Date
      </label>
      <DatePicker
        id='date-picker'
        selected={selectedDate}
        placeholderText='Select Date'
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat='EEEE, MMMM d'
        className='date-picker-input'
      />
    </div>
  );
};

export default DatePickerComponent;
