import { useState } from 'react';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Modal from '../../components/Modal/Modal';
import './SidePanel.css';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import { MyCalendars } from '../../components/MyCalendars/MyCalendars';

export const SidePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <aside className='side-panel'>
      <Button className='w-60' onClick={handleOpenModal}>
        + Create
      </Button>
      {isModalOpen && (
        <Modal
          title='Create Event'
          content={<CreateEventForm />}
          onClose={handleCloseModal}
        />
      )}
      <Calendar />
      <MyCalendars />
    </aside>
  );
};
