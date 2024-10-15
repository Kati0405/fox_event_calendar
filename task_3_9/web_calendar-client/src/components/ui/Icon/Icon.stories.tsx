import { Meta, StoryFn } from '@storybook/react';
import { FaPlay, FaPause, FaEye } from 'react-icons/fa';
import { TbEyeClosed } from 'react-icons/tb';
import Icon, { IconProps } from './Icon';

const icons = {
  FaPlay,
  FaPause,
  FaEye,
};

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
  args: {
    icon: FaPlay,
    size: 1,
    color: 'currentColor',
  },
};

export default meta;

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: FaPlay,
  size: 2,
  color: 'currentColor',
};

export const PlayIcon = Template.bind({});
PlayIcon.args = {
  icon: FaPlay,
  size: 2,
  color: 'green',
};

export const PauseIcon = Template.bind({});
PauseIcon.args = {
  icon: FaPause,
  size: 2,
  color: 'red',
};

export const EyeIcon = Template.bind({});
EyeIcon.args = {
  icon: FaEye,
  size: 1,
  color: 'black',
};

export const ClosedEyeIcon = Template.bind({});
ClosedEyeIcon.args = {
  icon: TbEyeClosed,
  size: 1,
  color: 'black',
};
