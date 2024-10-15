import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdTitle, MdOutlineSubject } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';

import Button from '@components/ui/Button';
import DatePickerComponent from '@components/ui/DatePicker';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import TimePickerComponent from '../TimePicker/TimePicker';
import { Context } from '@/context/context';
import { Calendar, Event } from '@/types/types';

interface CreateEventFormProps {
  closeModal: () => void;
  initialDate?: Date | null;
  event?: Event;
  onEditEvent?: (event: Event) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  closeModal,
  initialDate,
  event,
  onEditEvent,
}) => {
  const { calendars, setEvents } = useContext(Context)!;

  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );
  const [calendar, setCalendar] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setEventDate(initialDate);
    }
    if (event) {
      setTitle(event.title);
      setEventDate(event.date);
      setCalendar(event.calendarId);
      setDescription(event.description);
      setStartTime(event.start_time);
      setEndTime(event.end_time);
    }
  }, [initialDate, event]);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventDate(event.date);
      setCalendar(event.calendarId);
      setDescription(event.description);
      setStartTime(event.start_time);
      setEndTime(event.end_time);
    } else {
      setTitle('');
      setEventDate(null);
      setCalendar('');
      setDescription('');
      setStartTime(null);
      setEndTime(null);
    }
  }, [event]);

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
      alert('Please fill in all fields.');
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time.');
      return;
    }

    const start = new Date(eventDate);
    start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    const end = new Date(eventDate);
    end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    const newEvent = {
      id: event ? event.id : uuidv4(),
      date: eventDate,
      start_time: start,
      end_time: end,
      title: title,
      description: description,
      calendarId: calendar,
    };
    if (onEditEvent) {
      onEditEvent(newEvent);
    } else {
      setEvents((prevEvents: Event[]) => [...prevEvents, newEvent]);
    }

    closeModal();
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
        <select
          id='calendar'
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
          className='border-b-2 border-black pb-2 w-full focus:outline-none mb-3'
        >
          {calendars.map((cal: Calendar) => (
            <option key={cal.id} value={cal.id}>
              {cal.title}
            </option>
          ))}
        </select>
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
