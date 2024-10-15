import { Meta, StoryFn } from '@storybook/react';
import Card, { CardProps } from './Card';
import { options } from './constants';

const meta: Meta<typeof Card> = {
  title: 'Test/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'auto',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          flexWrap: 'wrap',
          height: '100%',
          gap: '10px 30px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Some card',
  },
  argTypes: {
    color: {
      options: options.colors,
      control: { type: 'radio' },
    },
    size: {
      options: options.sizes,
      control: { type: 'radio' },
    },
  },
};

export default meta;

interface ListTemplateProps {
  items: CardProps[];
}

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

const ListTemplate: StoryFn<ListTemplateProps> = ({ items, ...args }) => (
  <>
    {items.map((item, index) => (
      <Card key={index} {...args} {...item} />
    ))}
  </>
);

export const Default = Template.bind({});

export const Clickable = Template.bind({});
Clickable.args = {
  isClickable: true,
};

export const Draggable = Template.bind({});
Draggable.args = {
  isDraggable: true,
};

export const Colors = ListTemplate.bind({});
Colors.args = {
  items: options.colors.map((color) => ({ color })),
};

export const Sizes = ListTemplate.bind({});
Sizes.args = {
  items: options.sizes.map((size) => ({ size })),
};
