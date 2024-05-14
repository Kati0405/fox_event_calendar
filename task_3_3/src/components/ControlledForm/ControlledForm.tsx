import { useState, useEffect } from 'react';

import Button from './Button/Button';
import Checkbox from './Checkbox/Checkbox';
import PasswordInput from './PasswordInput/PasswordInput';
import TextInput from './TextInput/TextInput';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const ControlledForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Errors>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const submitForm = () => {
    alert('Form was submitted');
    console.log(formValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.values(errors).every((error) => error === '')) {
      setIsSubmitting(true);
      submitForm();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values: FormValues): Errors => {
    const errors: Errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };

    const emailRe = /^(?:[a-zA-Z0-9._%+-]+)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const passwordRe =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailRe.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!passwordRe.test(values.password)) {
      errors.password =
        'Password should contain at least 8 characters with upper/lowercase, digit, and special character';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!isChecked) {
      errors.terms = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className='form-container px-12 pt-9 bg-stone-800 rounded-md flex flex-col'
      >
        <TextInput
          name={'username'}
          id={'username'}
          label={'Username'}
          type={'text'}
          placeholder={'Enter your username'}
          isRequired={true}
          value={formValues.username}
          onChange={handleChange}
          error={formErrors.username}
        />
        <TextInput
          name={'email'}
          id={'email'}
          label={'Email'}
          type={'email'}
          placeholder={'Enter your email'}
          isRequired={true}
          value={formValues.email}
          onChange={handleChange}
          error={formErrors.email}
        />
        <PasswordInput
          name={'password'}
          id={'password'}
          label={'Password'}
          placeholder='Enter your password'
          isRequired={true}
          value={formValues.password}
          onChange={handleChange}
          error={formErrors.password}
        />

        <PasswordInput
          name={'confirmPassword'}
          id={'confirmPassword'}
          label={'Confirm password'}
          placeholder='Enter your password'
          isRequired={true}
          value={formValues.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
        />

        <Checkbox
          id={'terms'}
          checked={isChecked}
          onChange={toggleCheckbox}
          error={formErrors.terms}
        />

        <Button text={'Register'} />
        <span className='text-white pt-2'>*Required field</span>
      </form>
    </>
  );
};

export default ControlledForm;
