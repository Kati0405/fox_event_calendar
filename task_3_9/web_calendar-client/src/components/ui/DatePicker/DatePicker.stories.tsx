import { Meta, StoryFn } from '@storybook/react';
import DatePickerComponent from './DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

export default {
  title: 'Components/DatePickerComponent',
  component: DatePickerComponent,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '300px',
          margin: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <DatePickerComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
