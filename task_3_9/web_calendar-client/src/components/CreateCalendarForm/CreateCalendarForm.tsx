import { useState } from 'react';
import { MdTitle, MdOutlinePalette } from 'react-icons/md';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ColorPicker from '../ColorPicker/ColorPicker';
import { colors } from '../../constants/constants';
import { v4 as uuidv4 } from 'uuid';

interface CreateCalendarFromProps {
  onAddCalendar: (newCalendar: {
    id: string;
    title: string;
    color: string;
  }) => void;
}

export const CreateCalendarForm: React.FC<CreateCalendarFromProps> = ({
  onAddCalendar,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !selectedColor) {
      alert('Please provide a title and select a color.');
      return;
    }
    const newCalendar = {
      id: uuidv4(),
      title: title,
      color: selectedColor,
    };
    onAddCalendar(newCalendar);
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
        Save
      </Button>
    </form>
  );
};
