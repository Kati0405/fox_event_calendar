import { useEffect, useState } from 'react';
import { MdTitle, MdOutlineSubject } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';

import Button from 'src/components/ui/Button';
import DatePickerComponent from 'src/components/ui/DatePicker';
import Icon from 'src/components/ui/Icon';
import Input from 'src/components/ui/Input';
import TimePickerComponent from '../TimePicker';
import { Calendar, Event } from 'src/types/types';
import CheckboxWithLabel from 'src/components/ui/CheckboxLabeled/CheckboxLabeled';
import { RepeatOptions } from 'src/constants/constants';
import { useCalendarContext } from 'src/hooks/useCalendarContext';
import { createEvent, updateEvent } from 'src/api/eventService';

export interface CreateEventFormProps {
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
  const { loading, data } = useCalendarContext();
  const { calendars, setEvents } = data;

  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );
  const [calendar, setCalendar] = useState(calendars[0]?._id || '');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeatOption, setRepeatOption] = useState<RepeatOptions>(
    RepeatOptions.DOES_NOT_REPEAT
  );

  useEffect(() => {
    if (initialDate) {
      setEventDate(initialDate);
    }
    if (event) {
      setTitle(event.title);
      setEventDate(new Date(event.date));
      setCalendar(event.calendarId);
      setDescription(event.description);
      setStartTime(new Date(event.start_time));
      setEndTime(new Date(event.end_time));
      setIsAllDay(event.isAllDay || false);
    }
  }, [initialDate, event, calendars]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEventDateChange = (date: Date | null) => {
    setEventDate(date);
  };

  const handleTimeChange = (start: Date | null, end: Date | null) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleAllDayChange = () => {
    setIsAllDay((prev) => !prev);
    if (!isAllDay) {
      setStartTime(new Date(eventDate!.setHours(0, 0, 0, 0)));
      setEndTime(new Date(eventDate!.setHours(23, 59, 0, 0)));
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleRepeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRepeatOption(e.target.value as RepeatOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime || !title || !eventDate) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isAllDay && startTime >= endTime) {
      alert('Start time must be before end time.');
      return;
    }
    const start = new Date(eventDate);
    const end = new Date(eventDate);

    if (!isAllDay) {
      start.setHours(startTime!.getHours(), startTime!.getMinutes(), 0, 0);
      end.setHours(endTime!.getHours(), endTime!.getMinutes(), 0, 0);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 0, 0);
    }

    const newEvent: Event = {
      _id: event?._id,
      date: start.toISOString(),
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      title,
      description,
      calendarId: calendar,
      isAllDay,
      repeatOption,
    };

    try {
      if (event) {
        await updateEvent(event._id!, newEvent);
        if (onEditEvent) onEditEvent(newEvent);
      } else {
        await createEvent(newEvent);
        setEvents((prevEvents: Event[]) => [...prevEvents, newEvent]);
      }
      closeModal();
    } catch (error) {
      alert('Error saving event: ' + error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
          <DatePickerComponent
            onDateChange={handleEventDateChange}
            initialDate={eventDate}
          />
          {!isAllDay && (
            <TimePickerComponent
              onTimeChange={handleTimeChange}
              initialStartTime={startTime}
              initialEndTime={endTime}
            />
          )}
        </div>
      </div>
      <div className='flex flex-row mt-3 mb-3 ml-6'>
        <CheckboxWithLabel
          label={'All day'}
          checked={isAllDay}
          onChange={handleAllDayChange}
        ></CheckboxWithLabel>
        <select
          name='repeat'
          id='repeat'
          className='border-b-2 border-black p-2 focus:outline-none'
          onChange={handleRepeatChange}
        >
          {Object.values(RepeatOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
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
            <option key={cal._id} value={cal._id}>
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
