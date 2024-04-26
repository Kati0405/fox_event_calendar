import React, { useRef, useState, useEffect } from 'react';
import Button from '../UncontrolledForm/Button/Button';
import Checkbox from '../UncontrolledForm/Checkbox/Checkbox';
import PasswordInput from '../UncontrolledForm/PasswordInput/PasswordInput';
import TextInput from '../UncontrolledForm/TextInput/TextInput';

interface Errors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const UncontrolledForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const formValues = {
    username: usernameRef.current?.value || '',
    email: emailRef.current?.value || '',
    password: passwordRef.current?.value || '',
    confirmPassword: confirmPasswordRef.current?.value || '',
  };

  const [formErrors, setFormErrors] = useState<Errors>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = () => {
    alert('Form was submitted');
    console.log(formValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.values(errors).every((error) => error === '')) {
      setIsSubmitting(true);
      submitForm();
    }
  };

  const validate = (): Errors => {
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

    if (!usernameRef.current?.value) {
      errors.username = 'Username is required';
    }

    if (!emailRef.current?.value) {
      errors.email = 'Email is required';
    } else if (!emailRe.test(emailRef.current.value)) {
      errors.email = 'Invalid email format';
    }

    if (!passwordRef.current?.value) {
      errors.password = 'Password is required';
    } else if (!passwordRe.test(passwordRef.current.value)) {
      errors.password =
        'Password should contain at least 8 characters with upper/lowercase, digit, and special character';
    }

    if (!confirmPasswordRef.current?.value) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (
      passwordRef.current?.value !== confirmPasswordRef.current.value
    ) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!termsRef.current?.checked) {
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
          elRef={usernameRef}
          error={formErrors.username}
        />
        <TextInput
          name={'email'}
          id={'email'}
          label={'Email'}
          type={'email'}
          placeholder={'Enter your email'}
          isRequired={true}
          elRef={emailRef}
          error={formErrors.email}
        />
        <PasswordInput
          name={'password'}
          id={'password'}
          label={'Password'}
          placeholder='Enter your password'
          isRequired={true}
          elRef={passwordRef}
          error={formErrors.password}
        />

        <PasswordInput
          name={'confirmPassword'}
          id={'confirmPassword'}
          label={'Confirm password'}
          placeholder='Enter your password'
          isRequired={true}
          elRef={confirmPasswordRef}
          error={formErrors.confirmPassword}
        />

        <Checkbox id={'terms'} elRef={termsRef} error={formErrors.terms} />

        <Button text={'Register'} />
        <span className='text-white pt-2'>*Required field</span>
      </form>
    </>
  );
};

export default UncontrolledForm;
