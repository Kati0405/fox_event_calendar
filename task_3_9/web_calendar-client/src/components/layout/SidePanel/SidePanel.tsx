import { useState } from 'react';
import Button from '@components/ui/Button';
import Calendar from '@components/features/Calendar/Calendar';
import Modal from '@components/ui/Modal';
import './SidePanel.css';
import CreateEventForm from '@components/features/CreateEventForm/CreateEventForm';
import { MyCalendars } from '@components/features/MyCalendars/MyCalendars';

export const SidePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    handleOpenModal();
  };

  return (
    <aside className='side-panel'>
      <Button className='w-60' onClick={handleOpenModal}>
        + Create
      </Button>
      {isModalOpen && (
        <Modal
          title='Create Event'
          content={
            <CreateEventForm
              closeModal={handleCloseModal}
              initialDate={selectedDate}
            />
          }
          onClose={handleCloseModal}
        />
      )}
      <Calendar onDateSelect={handleDateSelect} />
      <MyCalendars />
    </aside>
  );
};
