import { startOfDay, differenceInMinutes, format } from 'date-fns';
import { Event } from '../../../types/types';
import { useContext, useState } from 'react';
import { Context } from '../../../context/context';
import Modal from '../../ui/Modal/Modal';
import { EventInfo } from '../../features/EventInfo/EventInfo';

const minutes_in_day = 24 * 60;

interface DayEvent {
  day: Date;
  event: Event;
  index: number;
  grouplength: number;
  containerHeight: number;
}

export const DayEvent: React.FC<DayEvent> = ({
  day,
  event,
  index,
  grouplength,
  containerHeight,
}) => {
  const { selectedView, calendars, checkedCalendars } = useContext(Context)!;
  const today = startOfDay(day);
  const eventDuration = differenceInMinutes(event.end_time, event.start_time);

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calendar = calendars.find(
    (calendar) => calendar.id === event.calendarId
  );
  const eventColor = calendar ? calendar.color : 'green';

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
      backgroundColor: isHovered ? `${eventColor}c5` : `${eventColor}4d`,
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
        className='bg-[#EEC04C4D] border border-white rounded cursor-pointer absolute'
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
