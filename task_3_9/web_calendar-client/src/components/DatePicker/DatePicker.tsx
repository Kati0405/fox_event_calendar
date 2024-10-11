import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

interface DatePickerComponentProps {
  onDateChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    onDateChange(selectedDate);
  });

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
