import { Field, FormikErrors, FormikTouched } from 'formik';

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  errors: FormikErrors<{ [key: string]: string }>;
  touched: FormikTouched<{ [key: string]: boolean }>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  errors,
  touched,
}) => {
  return (
    <div>
      <label
        className='block text-xs text-dark-blue mb-2 font-bold'
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`block w-full border-b-2 outline-none py-2 ${
          errors[name] && touched[name]
            ? 'border-red-600'
            : 'border-input-gray focus:border-dark-blue'
        }`}
      />
      {errors[name] && touched[name] ? (
        <div className='text-red-600 text-sm mt-1'>{errors[name]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
