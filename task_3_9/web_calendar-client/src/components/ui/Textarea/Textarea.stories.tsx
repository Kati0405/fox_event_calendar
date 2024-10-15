import { Meta, StoryFn } from '@storybook/react';
import Textarea, { TextareaProps } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  placeholder: 'Enter text here...',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Label',
  placeholder: 'Enter text here...',
  error: 'This field is required.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label',
  placeholder: 'Enter text here...',
  disabled: true,
};
