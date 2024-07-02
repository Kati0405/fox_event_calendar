export type InputProps = {
  size?: 's' | 'm';
  disabled: boolean;
  type: 'text' | 'number' | 'email' | 'password';
};

export const AppInput = ({
  size = 'm',
  disabled = false,
  type = 'text',
  ...props
}: InputProps) => (
  <input {...props} className={`${size}`} disabled={disabled} type={type} />
);
