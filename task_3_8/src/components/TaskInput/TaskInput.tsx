import './TaskInput.css';
import { Button } from '../Button/Button';
import { ChangeEvent, useState } from 'react';

interface TaskInputProps {
  addTask: (taskText: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className='task-input-container'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='task-input'
        placeholder='Type here to add a task...'
      />
      <Button onClick={handleAddTask}>+ Add</Button>
    </div>
  );
};
