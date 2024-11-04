import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdTitle, MdOutlinePalette } from 'react-icons/md';

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
    id: string;
    title: string;
    colorClass: string;
  }) => void;
  onEditCalendar?: (updatedCalendar: {
    id: string;
    title: string;
    colorClass: string;
  }) => void;
  calendarToEdit?: { id: string; title: string; colorClass: string } | null;
}

const CreateCalendarForm: React.FC<CreateCalendarFromProps> = ({
  onAddCalendar,
  onEditCalendar,
  calendarToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    if (calendarToEdit) {
      setTitle(calendarToEdit.title);
      setSelectedColor(calendarToEdit.colorClass);
    }
  }, [calendarToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !selectedColor) {
      alert('Please provide a title and select a color.');
      return;
    }
    if (calendarToEdit) {
      const updatedCalendar = {
        id: calendarToEdit.id,
        title: title,
        colorClass: selectedColor,
      };
      if (onEditCalendar) {
        onEditCalendar(updatedCalendar);
      }
    } else {
      const newCalendar = {
        id: uuidv4(),
        title: title,
        colorClass: selectedColor,
      };
      onAddCalendar(newCalendar);
    }
    setTitle('');
    setSelectedColor(colors[0]);
  };

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
      <Button className='w-full' type='submit'>
        {calendarToEdit ? 'Update' : 'Save'}
      </Button>
    </form>
  );
};

export default CreateCalendarForm;
