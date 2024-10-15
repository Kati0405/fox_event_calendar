import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Dropdown, { DropdownProps } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<DropdownProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <Dropdown {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  options: ['Month', 'Week', 'Day'],
  value: '',
};
