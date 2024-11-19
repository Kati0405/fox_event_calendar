import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

export interface TimePickerComponentProps {
  onTimeChange: (start: Date | null, end: Date | null) => void;
  initialStartTime?: Date | null;
  initialEndTime?: Date | null;
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({
  onTimeChange,
  initialStartTime = null,
  initialEndTime = null,
}) => {
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    initialStartTime
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    initialEndTime
  );

  useEffect(() => {
    if (initialStartTime) {
      setSelectedStartTime(initialStartTime);
    }
  }, [initialStartTime]);

  useEffect(() => {
    if (initialEndTime) {
      setSelectedEndTime(initialEndTime);
    }
  }, [initialEndTime]);

  useEffect(() => {
    onTimeChange(selectedStartTime, selectedEndTime);
  }, [selectedStartTime, selectedEndTime, onTimeChange]);

  const handleStartTimeChange = (time: Date | null) => {
    setSelectedStartTime(time);

    if (selectedEndTime && time && selectedEndTime <= time) {
      setSelectedEndTime(null);
    }
  };

  const handleEndTimeChange = (time: Date | null) => {
    if (selectedStartTime && time && time < selectedStartTime) {
      alert('End time cannot be earlier than start time.');
      return;
    }
    setSelectedEndTime(time);
  };

  return (
    <div className='time-picker-container flex flex-col'>
      <label htmlFor='time-picker' className='time-picker-label ml-3'>
        Time
      </label>
      <div className='flex flex-row ml-3'>
        <DatePicker
          id='time-picker'
          selected={selectedStartTime}
          onChange={handleStartTimeChange}
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
          onChange={handleEndTimeChange}
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
