import { useContext, useState } from 'react';
import { MdTitle, MdOutlineSubject, MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { format } from 'date-fns';

import { Event } from '@/types/types';
import Icon from '@components/ui/Icon';
import { Context } from '@/context/context';
import Modal from '@components/ui/Modal';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import Button from '@components/ui/Button';

interface EventInfoProps {
  event: Event;
}

export const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const { calendars, setEvents } = useContext(Context)!;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== eventToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  const findCalendarTitleById = (id: string) => {
    const calendar = calendars.find((calendar) => calendar.id === id);
    return calendar ? calendar.title : 'Unknown Calendar';
  };

  return (
    <div className='event-info relative'>
      <div className='event-info_actions flex flex-row absolute gap-3 right-8 top-[-3.2rem]'>
        <div
          className='cursor-pointer'
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          <Icon icon={MdModeEditOutline}></Icon>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            setEventToDelete(event);
            setIsDeleteModalOpen(true);
          }}
        >
          <Icon icon={RiDeleteBin7Fill}></Icon>
        </div>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdTitle}></Icon>
        {event.title}
      </div>

      {isEditModalOpen && (
        <Modal
          title='Edit Event'
          content={
            <CreateEventForm
              closeModal={() => setIsEditModalOpen(false)}
              event={event}
              onEditEvent={handleEditEvent}
            />
          }
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          title='Delete Event'
          content={
            <div>
              <p>
                Are you sure you want to delete '{eventToDelete?.title}'? This
                action cannot be undone.
              </p>
              <div className='flex justify-end mt-4 gap-3'>
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant='secondary'
                >
                  Cancel
                </Button>
                <Button onClick={handleDeleteEvent}>Delete</Button>
              </div>
            </div>
          }
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      <div className='flex flex-row gap-3'>
        <Icon icon={IoMdTime}></Icon>
        {`${format(event.date, 'EEEE, MMMM d')}, ${format(
          event.start_time,
          'H:mm aaa'
        )} - ${format(event.end_time, 'H:mm aaa')}`}
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={IoCalendarOutline}></Icon>

        {findCalendarTitleById(event.calendarId)}
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdOutlineSubject}></Icon>
        {event.description}
      </div>
    </div>
  );
};
