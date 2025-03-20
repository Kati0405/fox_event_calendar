import { startOfDay, differenceInMinutes, format } from 'date-fns';
import { useState } from 'react';

import { Event } from 'src/types/types';
import Modal from 'src/components/ui/Modal';
import EventInfo from 'src/components/features/EventInfo';
import { cn } from 'src/utils/utils';
import { useCalendarContext } from 'src/hooks/useCalendarContext';

const minutes_in_day = 24 * 60;

export interface DayEvent {
  day: Date;
  event: Event;
  index: number;
  grouplength: number;
  containerHeight: number;
}

const DayEvent: React.FC<DayEvent> = ({
  day,
  event,
  index,
  grouplength,
  containerHeight,
}) => {
  const { loading, data } = useCalendarContext();
  const { selectedView, calendars, checkedCalendars } = data;
  const today = startOfDay(day);
  const eventDuration = differenceInMinutes(event.end_time, event.start_time);

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calendar = calendars.find(
    (calendar) => calendar._id === event.calendarId
  );
  const eventColor = calendar ? calendar.colorClass : 'green';

  const isVisible = checkedCalendars.includes(event.calendarId);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  const generateBoxStyle = () => {
    const minutesPassed = differenceInMinutes(event.start_time, today);

    const percentage = minutesPassed / minutes_in_day;
    const top = percentage * containerHeight;
    const height = (eventDuration / minutes_in_day) * containerHeight;

    const isLast = index === grouplength - 1;
    let widthPercentage = grouplength === 1 ? 1 : (1 / grouplength) * 1.7;

    if (isLast) {
      widthPercentage = 1 / grouplength;
    }

    const styles = {
      top,
      height,
      padding: '2px 8px',
      zIndex: isHovered ? 100 + index + 10 : 100 + index,
      width: `${
        selectedView === 'Day'
          ? `calc((100% - 96px) * ${widthPercentage})`
          : `100% * ${widthPercentage}`
      }`,
    };

    if (isLast) {
      return { ...styles, right: 0 };
    }

    return {
      ...styles,
      left:
        selectedView === 'Day'
          ? `calc(100px + 100% * ${(1 / grouplength) * index})`
          : `calc(100% * ${(1 / grouplength) * index})`,
    };
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={handleOpenModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={generateBoxStyle()}
        className={cn(
          `border border-white rounded cursor-pointer absolute transition-opacity`,
          isHovered
            ? `bg-${eventColor} bg-opacity-100`
            : `bg-${eventColor} bg-opacity-50`
        )}
      >
        <h1 className='text-xs'>
          {`${event.title}, 
            ${format(event.start_time, 'h:mm a')} - 
            ${format(event.end_time, 'h:mm a')}`}{' '}
        </h1>
      </div>
      {isModalOpen && (
        <Modal
          title='Event Information'
          content={<EventInfo event={event} />}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DayEvent;
