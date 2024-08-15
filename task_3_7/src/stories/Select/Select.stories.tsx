import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import SelectMenu, { SelectMenuProps } from '../Select/Select';

const meta: Meta<typeof SelectMenu> = {
  title: 'Components/SelectMenu',
  component: SelectMenu,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<SelectMenuProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <SelectMenu {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Time',
  options: ['12:30', '12:45', '13:00'],
  value: '',
};
