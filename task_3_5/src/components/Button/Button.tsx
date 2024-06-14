interface ButtonProps {
  icon?: string;
  text?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        'bg-bright-green text-white h-9 px-5 rounded-lg flex flex-row justify-center items-center gap-1'
      }
    >
      {icon && <img src={icon} alt={text || 'icon'} />}
      {text}
    </button>
  );
};

export default Button;
