import { useState } from 'react';

interface CheckboxProps {
  id: string;
  error?: string;
  elRef?: React.RefObject<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, error, elRef }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className='mt-4'>
      <label htmlFor='terms' className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            id={id}
            ref={elRef}
            onChange={handleCheck}
            className='hidden'
          />
          <div className='w-4 h-4 flex justify-center items-center'>
            <img
              src={isChecked ? '/assets/checked.svg' : '/assets/unchecked.svg'}
              alt={isChecked ? 'checked' : 'unchecked'}
              className='w-full h-full'
            />
          </div>
        </div>
        <div className='ml-2 text-white'>
          I agree to the terms and conditions.
        </div>
      </label>
      {error && <div className='text-xs text-red-700'>{error}</div>}
    </div>
  );
};

export default Checkbox;
