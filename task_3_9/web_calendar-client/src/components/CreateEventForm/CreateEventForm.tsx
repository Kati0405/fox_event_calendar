import Button from '../Button/Button';
import DatePickerComponent from '../DatePicker/DatePicker';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import TimePickerComponent from '../TimePicker/TimePicker';
import { v4 as uuidv4 } from 'uuid';

import { MdTitle, MdOutlineSubject } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { Context } from '../../context/context';
import { Event } from '../../types/types';

const CreateEventForm = () => {
  const { setEvents } = useContext(Context)!;

  const [title, setTitle] = useState('');
  const [calendar, setCalendar] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);

  const handleEventDateChange = (date: Date | null) => {
    setEventDate(date);
  };

  const handleTimeChange = (start: Date | null, end: Date | null) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime || !title || !eventDate) {
      console.error('Please fill in all fields.');
      return;
    }

    if (startTime >= endTime) {
      console.error('Start time must be before end time.');
      return;
    }

    const newEvent = {
      id: uuidv4(),
      date: eventDate,
      start_time: startTime,
      end_time: endTime,
      title: title,
      description: description,
      calendar: calendar,
    };

    setEvents((prevEvents: Event[]) => [...prevEvents, newEvent]);

    console.log('New Event:', newEvent);
  };

  return (
    <form className='create-event-form' onSubmit={handleSubmit}>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdTitle}></Icon>
        <Input
          label='Title'
          value={title}
          onChange={(value) => setTitle(value)}
          placeholder='Set title'
        ></Input>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={IoMdTime}></Icon>
        <div className='select-date flex'>
          <DatePickerComponent onDateChange={handleEventDateChange} />
          <TimePickerComponent onTimeChange={handleTimeChange} />
        </div>
      </div>
      <div className='flex flex-row mt-3 mb-3 ml-6'>
        <label htmlFor='all_day' className='mt-3 mr-3'>
          <input
            type='checkbox'
            name='all_day'
            checked={isAllDay}
            onChange={() => setIsAllDay(!isAllDay)}
          ></input>
          All day
        </label>
        <select
          name='repeat'
          id='repeat'
          className='border-b-2 border-black p-2 focus:outline-none'
        >
          <option value='Does not repeat'>Does not repeat</option>
          <option value='Daily'>Daily</option>
          <option value='Weekly'>Weekly</option>
          <option value='Monthly'>Monthly</option>
          <option value='Annually'>Annually</option>
        </select>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={IoCalendarOutline}></Icon>
        <Input
          label='Calendar'
          value={calendar}
          onChange={(value) => setCalendar(value)}
          placeholder='Calendar'
        ></Input>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdOutlineSubject}></Icon>
        <Input
          label='Description'
          value={description}
          onChange={(value) => setDescription(value)}
          placeholder='Enter description'
        ></Input>
      </div>
      <Button className='w-full' type='submit'>
        Save
      </Button>
    </form>
  );
};

export default CreateEventForm;
