import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Toast, { ToastProps } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<ToastProps> = (args) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 1000);
  };

  return visible ? <Toast {...args} onClose={handleClose} /> : <></>;
};

export const Default = Template.bind({});
Default.args = {
  message: 'Event deleted',
};
