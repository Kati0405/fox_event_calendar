import { useState } from 'react';
import Icon from '../Icon/Icon';
import { FaPlus } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { CreateCalendarForm } from '../CreateCalendarForm/CreateCalendarForm';
import { calendars as initialCalendars } from '../../constants/constants';
import CheckboxWithLabel from '../CheckboxLabeled/CheckboxLabeled';
import { Calendar } from '../../types/types';

export const MyCalendars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedCalendars, setCheckedCalendars] = useState<string[]>([]);
  const [calendars, setCalendars] = useState<Calendar[]>(initialCalendars);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedCalendars((prev) =>
      prev.includes(id)
        ? prev.filter((checkedId) => checkedId !== id)
        : [...prev, id]
    );
  };

  const handleAddCalendar = (newCalendar: Calendar) => {
    setCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
    handleCloseModal();
  };

  return (
    <div className='mt-4 bg-white rounded-lg p-2 shadow-md'>
      <div className='my-calendars_header flex flex-row justify-between'>
        <p className='text-black font-bold'>My calendars</p>
        <div className='cursor-pointer' onClick={handleOpenModal}>
          <Icon icon={FaPlus}></Icon>
        </div>
      </div>
      <ul className='mt-3'>
        {calendars.map((calendar) => (
          <li key={calendar.id} className='flex items-center mb-3'>
            <CheckboxWithLabel
              label={calendar.title}
              checked={checkedCalendars.includes(calendar.id)}
              onChange={() => handleCheckboxChange(calendar.id)}
              color={calendar.color}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal
          title='Create calendar'
          content={<CreateCalendarForm onAddCalendar={handleAddCalendar} />}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
