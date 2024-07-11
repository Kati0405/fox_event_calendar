import { Meta, StoryFn } from '@storybook/react';
import CheckboxWithLabel, { CheckboxWithLabelProps } from './CheckboxLabeled';

const meta: Meta<typeof CheckboxWithLabel> = {
  title: 'Components/CheckboxLabeled',
  component: CheckboxWithLabel,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<CheckboxWithLabelProps> = (args) => (
  <CheckboxWithLabel {...args} />
);

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  label: 'Label',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Label',
};
