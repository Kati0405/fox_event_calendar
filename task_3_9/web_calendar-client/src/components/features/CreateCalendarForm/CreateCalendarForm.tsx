import { useEffect, useState } from 'react';
import { MdTitle, MdOutlinePalette } from 'react-icons/md';

import { createCalendar, updateCalendar } from 'src/api/calendarService';

import Icon from 'src/components/ui/Icon';
import Input from 'src/components/ui/Input';
import Button from 'src/components/ui/Button';
import ColorPicker from 'src/components/ui/ColorPicker';

const colors = [
  'red-dark',
  'red',
  'orange',
  'yellow',
  'yellow-dark',
  'green',
  'green-light',
  'green-dark',
  'blue',
  'blue-light',
  'purple',
  'purple-light',
];

export interface CreateCalendarFromProps {
  onAddCalendar: (newCalendar: {
    _id: string;
    title: string;
    colorClass: string;
    userId: string;
  }) => void;
  onEditCalendar?: (updatedCalendar: {
    _id: string;
    title: string;
    colorClass: string;
    userId: string;
  }) => void;
  calendarToEdit?: { _id: string; title: string; colorClass: string } | null;
}

const CreateCalendarForm: React.FC<CreateCalendarFromProps> = ({
  onAddCalendar,
  onEditCalendar,
  calendarToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (calendarToEdit) {
      setTitle(calendarToEdit.title);
      setSelectedColor(calendarToEdit.colorClass);
    }
  }, [calendarToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !selectedColor) {
      alert('Please provide a title and select a color.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const calendarData = { title, colorClass: selectedColor };
      if (calendarToEdit) {
        const updatedCalendar = await updateCalendar(
          calendarToEdit._id,
          calendarData
        );
        if (onEditCalendar) onEditCalendar(updatedCalendar);
      } else {
        const newCalendar = await createCalendar(calendarData);
        onAddCalendar(newCalendar);
      }

      setTitle('');
      setSelectedColor(colors[0]);
    } catch (error) {
      console.error('Error:', error);
      setError('There was an error while saving the calendar.');
    } finally {
      setLoading(false);
    }
  };

  // if (calendarToEdit) {
  //   const updatedCalendar = {
  //     id: calendarToEdit.id,
  //     title: title,
  //     colorClass: selectedColor,
  //   };
  //   if (onEditCalendar) {
  //     onEditCalendar(updatedCalendar);
  //   }
  // } else {
  //   const newCalendar = {
  //     id: uuidv4(),
  //     title: title,
  //     colorClass: selectedColor,
  //   };
  //   onAddCalendar(newCalendar);
  // }
  // setTitle('');
  // setSelectedColor(colors[0]);
  //};

  return (
    <form className='create-event-form' onSubmit={handleSubmit}>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdTitle}></Icon>
        <Input
          label='Title'
          value={title}
          onChange={(value) => setTitle(value)}
          placeholder='Set title'
        ></Input>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdOutlinePalette}></Icon>

        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onChange={(color) => setSelectedColor(color)}
        />
      </div>
      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? 'Saving...' : calendarToEdit ? 'Update' : 'Save'}
      </Button>
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  );
};

export default CreateCalendarForm;
