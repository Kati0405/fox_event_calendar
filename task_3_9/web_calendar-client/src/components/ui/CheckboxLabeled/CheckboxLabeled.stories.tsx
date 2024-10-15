import { Meta, StoryFn } from '@storybook/react';
import CheckboxLabeled, { CheckboxLabeledProps } from './CheckboxLabeled';

const meta: Meta<typeof CheckboxLabeled> = {
  title: 'Components/CheckboxWithLabel',
  component: CheckboxLabeled,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

const Template: StoryFn<CheckboxLabeledProps> = (args) => (
  <CheckboxLabeled {...args} />
);

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  label: 'Text',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  label: 'Text',
  disabled: true,
};
