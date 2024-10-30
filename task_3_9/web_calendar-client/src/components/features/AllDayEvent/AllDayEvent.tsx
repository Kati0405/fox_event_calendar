import { useContext, useState } from 'react';
import { format } from 'date-fns';

import { calendars } from 'src/constants/constants';
import { cn, filterAllDayEvents, getCalendarColor } from 'src/utils/utils';
import { Context } from 'src/context/context';
import Modal from 'src/components/ui/Modal';
import EventInfo from 'src/components/features/EventInfo';
import { Event } from 'src/types/types';

export interface AllDayEventProps {
  formattedDate: string;
}

const AllDayEvent: React.FC<AllDayEventProps> = ({ formattedDate }) => {
  const { events } = useContext(Context)!;
  const allDayEvents = filterAllDayEvents(events, formattedDate);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (allDayEvents.length === 0) {
    return null;
  }

  return (
    <div className='cursor-pointer'>
      {allDayEvents.map((event) => {
        const eventColor = getCalendarColor(calendars, event.calendarId);
        const isHovered = hoveredEventId === event.id;
        const backgroundClass = isHovered
          ? `bg-${eventColor} bg-opacity-100`
          : `bg-${eventColor} bg-opacity-50`;

        const combinedClassName = `text-xs p-1 rounded-md ${cn(
          backgroundClass,
          getCalendarColor(calendars, event.calendarId)
        )}`;

        return (
          <div
            key={event.id}
            className={`${combinedClassName}`}
            onMouseEnter={() => setHoveredEventId(event.id)}
            onMouseLeave={() => setHoveredEventId(null)}
            onClick={() => handleOpenModal(event)}
          >
            <h1>{`${event.title}, 
              ${format(event.start_time, 'h:mm a')} - 
              ${format(event.end_time, 'h:mm a')}`}</h1>
          </div>
        );
      })}

      {isModalOpen && selectedEvent && (
        <Modal
          title='Event Information'
          content={<EventInfo event={selectedEvent} />}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AllDayEvent;
