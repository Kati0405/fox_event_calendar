interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type='submit'
      className='bg-green-600 disabled:bg-green-100 disabled:text-slate-500 rounded-md text-white text-center mt-8 py-2'
    >
      {text}
    </button>
  );
};

export default Button;
