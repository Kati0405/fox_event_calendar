import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

import play_icon_light from '../../assets/icons/play-icon_light.svg'
import play_icon_dark from '../../assets/icons/play-icon_dark.svg'

const meta: Meta<typeof Button> = {
  title: 'App/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    icon: {
      control: 'boolean',
    },
  }
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    disabled: false,
    children: 'Primary Button'
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    primary: true,
    disabled: false,
    children: 'Primary Button',
    icon: play_icon_light,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    primary: true,
    disabled: true,
    children: 'Primary Disabled'
  },
};

export const PrimaryDisabledWithIcon: Story = {
  args: {
    primary: true,
    disabled: true,
    icon: play_icon_light,
    children: 'Primary Disabled'
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    disabled: false,
    children: 'Secondary Button'
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    primary: false,
    disabled: false,
    children: 'Secondary Button',
    icon: play_icon_dark,
  },
};

export const SecondaryDisabledWithIcon: Story = {
  args: {
    primary: false,
    disabled: true,
    icon: play_icon_dark,
    children: 'Secondary Disabled'
  },
};

export const SecondaryDisabled: Story = {
  args: {
    primary: false,
    disabled: true,
    children: 'Secondary Disabled'
  },
};
