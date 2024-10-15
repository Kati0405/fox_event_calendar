import { Meta, StoryFn } from '@storybook/react';
import Link, { LinkProps } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Link',
    href: '#',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    href: {
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<LinkProps> = (args) => <Link {...args} />;

export const Active = Template.bind({});
Active.args = {
  disabled: false,
  href: '#',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
