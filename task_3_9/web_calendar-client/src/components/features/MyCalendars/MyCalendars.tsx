import { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin7Fill } from 'react-icons/ri';

import Modal from 'src/components/ui/Modal';
import CheckboxWithLabel from 'src/components/ui/CheckboxLabeled';
import Icon from 'src/components/ui/Icon';
import CreateCalendarForm from 'src/components/features/CreateCalendarForm';
import { Calendar, Event } from 'src/types/types';
import { Context } from 'src/context/context';
import Button, { ButtonState } from 'src/components/ui/Button';

import { deleteCalendar } from 'src/api/calendarService';

const MyCalendars = () => {
  const {
    calendars,
    setCalendars,
    checkedCalendars,
    setCheckedCalendars,
    setEvents,
  } = useContext(Context)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [calendarToDelete, setCalendarToDelete] = useState<Calendar | null>(
    null
  );
  const [calendarToEdit, setCalendarToEdit] = useState<Calendar | null>(null);
  const [hoveredCalendar, setHoveredCalendar] = useState<string | null>(null);

  useEffect(() => {
    if (calendars.length > 0) {
      setCheckedCalendars(calendars.map((calendar) => calendar._id));
    }
  }, [calendars, setCheckedCalendars]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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
    setCheckedCalendars((prevChecked) => [...prevChecked, newCalendar._id]);
    handleCloseModal();
  };

  const handleEditCalendar = (updatedCalendar: Calendar) => {
    setCalendars((prevCalendars) =>
      prevCalendars.map((cal) =>
        cal._id === updatedCalendar._id ? updatedCalendar : cal
      )
    );
    handleCloseModal();
  };

  const handleStartEditCalendar = (calendar: Calendar) => {
    setCalendarToEdit(calendar);
    setIsModalOpen(true);
  };

  const handleDeleteCalendar = (id: string) => {
    const calendar = calendars.find((cal) => cal._id === id);
    if (calendar && !calendar.isDefault) {
      setCalendarToDelete(calendar);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteCalendar = async () => {
    if (calendarToDelete) {
      try {
        await deleteCalendar(calendarToDelete._id);

        setCalendars((prevCalendars) =>
          prevCalendars.filter((cal) => cal._id !== calendarToDelete._id)
        );

        setEvents((prevEvents: Event[]) =>
          prevEvents.filter(
            (event) => event.calendarId !== calendarToDelete._id
          )
        );

        setIsDeleteModalOpen(false);
        setCalendarToDelete(null);
      } catch (error) {
        console.error('Failed to delete the calendar.', error);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCalendarToDelete(null);
  };

  return (
    <div className='mt-4 bg-white rounded-lg p-2 shadow-md'>
      <div className='my-calendars_header flex flex-row justify-between'>
        <p className='text-black font-bold'>My calendars</p>
        <div className='cursor-pointer' onClick={handleOpenModal}>
          <Icon icon={FaPlus} />
        </div>
      </div>

      <ul className='mt-3'>
        {calendars.length === 0 && <li>No calendars found. Please add one!</li>}

        {calendars.map((calendar) => (
          <li
            key={calendar._id}
            className='flex items-center mb-3 hover:bg-gray-100 justify-between'
            onMouseEnter={() => setHoveredCalendar(calendar._id)}
            onMouseLeave={() => setHoveredCalendar(null)}
          >
            <CheckboxWithLabel
              label={calendar.title}
              checked={checkedCalendars.includes(calendar._id)}
              onChange={() => handleCheckboxChange(calendar._id)}
              className={calendar.colorClass}
            />
            {hoveredCalendar === calendar._id && (
              <div className='flex gap-3 self-end'>
                <button onClick={() => handleStartEditCalendar(calendar)}>
                  <Icon icon={MdModeEditOutline} />
                </button>
                {!calendar.isDefault && (
                  <button onClick={() => handleDeleteCalendar(calendar._id)}>
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
                Are you sure you want to delete '{calendarToDelete?.title}'? You
                will no longer have access to this calendar and its events.
              </p>
              <div className='flex justify-end mt-4 gap-3'>
                <Button onClick={cancelDelete} variant={ButtonState.Secondary}>
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
