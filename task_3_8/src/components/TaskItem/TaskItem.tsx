import { useState } from 'react';
import { Task } from '../../types/types';

import './TaskItem.css';

import delete_icon from '../../assets/delete.svg';
import edit_icon from '../../assets/edit.svg';
import confirm_icon from '../../assets/confirm.svg';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (task: Task) => void;
  deleteTask: (task: Task) => void;
  editTask: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTaskDone,
  deleteTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditClick = () => setIsEditing(true);

  const handleConfirmClick = (task: Task) => {
    setEditedText(editedText);
    const updatedTask = { ...task, text: editedText };
    console.log(updatedTask);
    editTask(updatedTask);
    setIsEditing(false);
    console.log(editedText);
  };

  return (
    <li
      key={task._id}
      className={`task-box ${task.isDone ? 'crossed-out' : ''} ${
        isEditing ? 'editing' : ''
      }`}
    >
      <input
        type='checkbox'
        className='checkbox'
        checked={task.isDone}
        onChange={() => toggleTaskDone(task)}
      />
      <div className='line'></div>
      <div className='text-field-wrapper'>
        <textarea
          className={`text-field ${task.isDone ? 'crossed-out' : ''}`}
          value={isEditing ? editedText : task.text}
          onChange={(e) => {
            setEditedText(e.target.value);
          }}
          readOnly={!isEditing}
        />
      </div>
      <div className='buttons-container'>
        {!isEditing ? (
          <>
            <button className='edit-btn' onClick={handleEditClick}>
              <img src={edit_icon} alt='Edit' />
            </button>
            <button className='delete-btn' onClick={() => deleteTask(task)}>
              <img src={delete_icon} alt='Delete' />
            </button>
          </>
        ) : (
          <button
            className='confirm-btn'
            onClick={() => handleConfirmClick(task)}
          >
            <img src={confirm_icon} alt='Confirm' />
          </button>
        )}
      </div>
    </li>
  );
};
