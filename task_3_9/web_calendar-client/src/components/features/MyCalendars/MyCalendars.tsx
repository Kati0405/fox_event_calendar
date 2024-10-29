import { useContext, useState } from 'react';

import { FaPlus } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin7Fill } from 'react-icons/ri';

import Modal from '@components/ui/Modal';
import CheckboxWithLabel from '@components/ui/CheckboxLabeled';
import Icon from '@components/ui/Icon';
import CreateCalendarForm from '../CreateCalendarForm';
import { calendars as initialCalendars } from '@/constants/constants';
import { Calendar, Event } from '@/types/types';
import { Context } from '@/context/context';
import Button from '@components/ui/Button';

const MyCalendars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [calendarToDelete, setCalendarToDelete] = useState<Calendar | null>(
    null
  );
  const [calendarToEdit, setCalendarToEdit] = useState<Calendar | null>(null);
  const { checkedCalendars, setCheckedCalendars, setEvents } =
    useContext(Context)!;
  const [calendars, setCalendars] = useState<Calendar[]>(initialCalendars);
  const [hoveredCalendar, setHoveredCalendar] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setCalendarToEdit(null);
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedCalendars((prevChecked: string[]) =>
      prevChecked.includes(id)
        ? prevChecked.filter((checkedId) => checkedId !== id)
        : [...prevChecked, id]
    );
  };

  const handleAddCalendar = (newCalendar: Calendar) => {
    setCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
    handleCloseModal();
  };

  const handleEditCalendar = (updatedCalendar: Calendar) => {
    setCalendars((prevCalendars) =>
      prevCalendars.map((cal) =>
        cal.id === updatedCalendar.id ? updatedCalendar : cal
      )
    );
    handleCloseModal();
  };

  const handleStartEditCalendar = (calendar: Calendar) => {
    setCalendarToEdit(calendar);
    handleOpenModal();
  };

  const handleDeleteCalendar = (id: string) => {
    const calendar = calendars.find((cal) => cal.id === id);
    if (calendar && !calendar.isDefault) {
      setCalendarToDelete(calendar);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteCalendar = () => {
    if (calendarToDelete) {
      setCalendars((prevCalendars: Calendar[]) =>
        prevCalendars.filter((cal) => cal.id !== calendarToDelete.id)
      );
      setEvents((prevEvents: Event[]) =>
        prevEvents.filter((event) => event.calendarId !== calendarToDelete?.id)
      );

      setIsDeleteModalOpen(false);
      setCalendarToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCalendarToDelete(null);
  };

  return (
    <div className='mt-4 bg-white rounded-lg p-2 shadow-md'>
      <div className='my-calendars_header flex flex-row justify-between'>
        <p className='text-black font-bold '>My calendars</p>
        <div className='cursor-pointer' onClick={handleOpenModal}>
          <Icon icon={FaPlus}></Icon>
        </div>
      </div>
      <ul className='mt-3'>
        {calendars.map((calendar) => (
          <li
            key={calendar.id}
            className='flex items-center mb-3 hover:bg-gray-100 justify-between'
            onMouseEnter={() => setHoveredCalendar(calendar.id)}
            onMouseLeave={() => setHoveredCalendar(null)}
          >
            <CheckboxWithLabel
              label={calendar.title}
              checked={checkedCalendars.includes(calendar.id)}
              onChange={() => handleCheckboxChange(calendar.id)}
              className={calendar.colorClass}
            />
            {hoveredCalendar === calendar.id && (
              <div className='flex gap-3 self-end'>
                <button onClick={() => handleStartEditCalendar(calendar)}>
                  <Icon icon={MdModeEditOutline} />
                </button>
                {!calendar.isDefault && (
                  <button onClick={() => handleDeleteCalendar(calendar.id)}>
                    <Icon icon={RiDeleteBin7Fill} />
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal
          title={calendarToEdit ? 'Edit calendar' : 'Create calendar'}
          content={
            <CreateCalendarForm
              onAddCalendar={handleAddCalendar}
              onEditCalendar={handleEditCalendar}
              calendarToEdit={calendarToEdit}
            />
          }
          onClose={handleCloseModal}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          title='Delete calendar'
          content={
            <div>
              <p>
                Are you sure you want to delete '{calendarToDelete?.title}'?
                You'll no longer have access to this calendar and its events.
              </p>
              <div className='flex justify-end mt-4 gap-3'>
                <Button onClick={cancelDelete} variant='secondary'>
                  Cancel
                </Button>
                <Button onClick={confirmDeleteCalendar}>Delete</Button>
              </div>
            </div>
          }
          onClose={cancelDelete}
        />
      )}
    </div>
  );
};

export default MyCalendars;
