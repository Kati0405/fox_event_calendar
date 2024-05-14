import { useState } from 'react';

interface PasswordInputProps {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  id,
  label,
  placeholder,
  isRequired,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='flex flex-col relative h-20'>
        <label htmlFor={id} className='text-white'>
          {label} {isRequired ? '*' : ''}
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className={`bg-stone-800 border-b-2 ${
            error ? 'border-red-600' : 'border-gray-600'
          } text-white`}
        />
        <div
          onClick={togglePasswordVisibility}
          className='absolute top-7 right-2'
        >
          {showPassword ? (
            <img src='/assets/eye-closed.svg' alt='Closed eye' />
          ) : (
            <img src='/assets/eye-open.svg' alt='Open eye' />
          )}
        </div>
        {error && <div className='text-xs text-red-700'>{error}</div>}
      </div>
    </>
  );
};

export default PasswordInput;
