import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

export interface TimePickerComponentProps {
  onTimeChange: (start: Date | null, end: Date | null) => void;
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({
  onTimeChange,
}) => {
  const [selectedStartTime, setSelectedStartTIme] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTIme] = useState<Date | null>(null);

  useEffect(() => {
    onTimeChange(selectedStartTime, selectedEndTime);
  }, [selectedStartTime, selectedEndTime, onTimeChange]);

  return (
    <div className='time-picker-container flex flex-col'>
      <label htmlFor='time-picker' className='time-picker-label ml-3'>
        Time
      </label>
      <div className='flex flex-row ml-3'>
        <DatePicker
          id='time-picker'
          selected={selectedStartTime}
          onChange={(time: Date | null) => setSelectedStartTIme(time)}
          className='time-picker-input'
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Time'
          dateFormat='h:mm aa'
          placeholderText='Start'
          renderCustomHeader={() => <span />}
        />
        <span className='mr-3'>-</span>
        <DatePicker
          id='time-picker'
          selected={selectedEndTime}
          onChange={(time: Date | null) => setSelectedEndTIme(time)}
          className='time-picker-input'
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Time'
          dateFormat='h:mm aa'
          placeholderText='End'
        />
      </div>
    </div>
  );
};

export default TimePickerComponent;
