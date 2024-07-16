import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Modal, { ModalProps } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: StoryFn<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return <>{isOpen && <Modal {...args} onClose={handleClose} />}</>;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};
