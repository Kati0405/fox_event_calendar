import './TextInput.css';

interface TextInputProps {
  name: string;
  id: string;
  label: string;
  type: string;
  placeholder: string;
  isRequired: boolean;
  error?: string;
  elRef?: React.RefObject<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  id,
  label,
  type,
  placeholder,
  isRequired,
  error,
  elRef,
}) => {
  return (
    <>
      <div className='flex flex-col relative h-20'>
        <label htmlFor={id} className='text-white'>
          {label} {isRequired ? '*' : ''}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          ref={elRef}
          className={`bg-stone-800 border-b-2 ${
            error ? 'border-red-600' : 'border-gray-600'
          } text-white`}
        />
        {error && <div className='text-xs text-red-700'>{error}</div>}
      </div>
    </>
  );
};

export default TextInput;
