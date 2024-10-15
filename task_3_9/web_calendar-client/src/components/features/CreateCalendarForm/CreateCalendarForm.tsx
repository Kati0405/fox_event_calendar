import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdTitle, MdOutlinePalette } from 'react-icons/md';

import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import ColorPicker from '@components/ui/ColorPicker';
import { colors } from '@/constants/constants';

interface CreateCalendarFromProps {
  onAddCalendar: (newCalendar: {
    id: string;
    title: string;
    color: string;
  }) => void;
  onEditCalendar?: (updatedCalendar: {
    id: string;
    title: string;
    color: string;
  }) => void;
  calendarToEdit?: { id: string; title: string; color: string } | null;
}

export const CreateCalendarForm: React.FC<CreateCalendarFromProps> = ({
  onAddCalendar,
  onEditCalendar,
  calendarToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    if (calendarToEdit) {
      setTitle(calendarToEdit.title);
      setSelectedColor(calendarToEdit.color);
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
        color: selectedColor,
      };
      if (onEditCalendar) {
        onEditCalendar(updatedCalendar);
      }
    } else {
      const newCalendar = {
        id: uuidv4(),
        title: title,
        color: selectedColor,
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
