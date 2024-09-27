import dayjs from 'dayjs';
import { useContext } from 'react';
import { Context } from '../../context/context';
import { Day as DayType } from '../../types/types';

export const Day: React.FC<DayType> = ({ date }) => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  const [day, dayOfWeek] = dayjs(date).format('DD ddd').split(' ');
  const { selectedView } = useContext(Context)!;
  const { events } = useContext(Context)!;

  const today = dayjs().format('YYYY-MM-DD');
  const isToday = today === formattedDate;

  const generateTimeSlots = (startHour: number, endHour: number) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const slots = generateTimeSlots(6, 23);

  const findEventForSlot = (timeSlot: string) => {
    return events.find((event) => {
      if (event.date !== formattedDate) return false;
      const eventStart = dayjs(`${formattedDate} ${event.startTime}`);
      const eventEnd = dayjs(`${formattedDate} ${event.endTime}`);
      const slotTime = dayjs(`${formattedDate} ${timeSlot}`);
      return slotTime.isAfter(eventStart) && slotTime.isBefore(eventEnd);
    });
  };

  return (
    <div className={`flex flex-col ${selectedView == 'Day' ? 'w-3/4' : ''}`}>
      <div
        className={`flex flex-col items-center p-2 border ${
          isToday ? 'bg-green-100 rounded-md' : ''
        }`}
      >
        <span className='text-lg font-bold'>{day}</span>
        <span className='text-sm'>{dayOfWeek.toUpperCase()}</span>
      </div>
      <div className='flex flex-col'>
        {slots.map((slot) => {
          const event = findEventForSlot(slot);
          return (
            <div
              key={slot}
              className={`time-slot p-2 border border-gray-200 text-center text-sm h-20 ${
                event ? 'bg-blue-200' : ''
              }`}
            >
              {event ? event.title : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};
