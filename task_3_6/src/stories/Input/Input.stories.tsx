import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Input, { InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    errorMessage: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password'],
    },
  },
};

export default meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  value: '',
  placeholder: 'Enter text...',
  disabled: false,
  hasError: false,
  errorMessage: '',
  type: 'text',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Label',
  value: 'Filled text',
  placeholder: 'Enter text...',
  disabled: false,
  hasError: false,
  errorMessage: '',
  type: 'text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label',
  value: '',
  placeholder: 'Enter text...',
  disabled: true,
  hasError: false,
  errorMessage: '',
  type: 'text',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Label',
  value: '',
  placeholder: 'Enter text...',
  disabled: false,
  hasError: true,
  errorMessage: 'This is an error message',
  type: 'text',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  value: '',
  placeholder: 'Enter password...',
  disabled: false,
  hasError: false,
  errorMessage: '',
  type: 'password',
};
