import checkedImage from '/assets/checked.svg';
import uncheckedImage from '/assets/unchecked.svg';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  error,
}) => {
  return (
    <div className='mt-4'>
      <label htmlFor='terms' className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            id={id}
            className='hidden'
            checked={checked}
            onChange={onChange}
          />
          <div className='w-4 h-4 flex justify-center items-center'>
            <img
              src={checked ? checkedImage : uncheckedImage}
              alt={checked ? 'checked' : 'unchecked'}
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
