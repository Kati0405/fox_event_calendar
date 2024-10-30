import { useState } from 'react';

import Button from 'src/components/ui/Button';
import Calendar from 'src/components/features/Calendar';
import Modal from 'src/components/ui/Modal';
import CreateEventForm from 'src/components/features/CreateEventForm';
import MyCalendars from 'src/components/features/MyCalendars';

const SidePanel = () => {
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
    <aside className='side-panel w-60 ml-14'>
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
export default SidePanel;
