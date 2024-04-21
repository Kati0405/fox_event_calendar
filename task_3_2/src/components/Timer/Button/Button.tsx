interface ButtonProps {
  colorClass: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ colorClass, onClick, children }) => {
  return (
    <button
      className={`${colorClass} text-white px-4 py-1 rounded-md w-40 h-9`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
