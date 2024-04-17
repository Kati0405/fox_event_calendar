interface ButtonProps {
  icon?: React.ReactNode;
  name: string;
  colorClass: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, name, colorClass, onClick }) => {
  return (
    <button
      className={`${colorClass} text-white px-4 py-1 rounded-md w-40 h-9`}
      onClick={onClick}
    >
      {icon} {name}
    </button>
  );
};

export default Button;
