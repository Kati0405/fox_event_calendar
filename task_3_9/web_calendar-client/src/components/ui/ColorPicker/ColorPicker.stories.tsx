import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import ColorPicker, { ColorPickerProps } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    colors: {
      control: 'object',
    },
    selectedColor: {
      control: 'color',
    },
  },
};

export default meta;

const Template: StoryFn<ColorPickerProps> = (args) => {
  const [selectedColor, setSelectedColor] = useState(args.selectedColor);

  return (
    <ColorPicker
      {...args}
      selectedColor={selectedColor}
      onChange={setSelectedColor}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  colors: [
    '#9F2957',
    '#D90056',
    '#E25D33',
    '#DFC45A',
    '#B8C42F',
    '#16AF6E',
    '#429488',
    '#397E49',
    '#439BDF',
    '#4254AF',
    '#6C7AC4',
    '#8332A4',
  ],
  selectedColor: '#D90056',
};
