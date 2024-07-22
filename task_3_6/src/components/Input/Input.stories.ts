import { Meta, StoryObj } from "@storybook/react";
import { AppInput } from "../Input/Input";


const meta: Meta<typeof AppInput> = {
    title: 'App/Input',
    component: AppInput,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof AppInput>;

export const DefaultInput: Story = {
    args: {
        type: 'text',
        disabled: false,
        size: 'm',

    }
}

export const SmallEmail: Story = {
    args: { ...DefaultInput.args, type: 'email', size: 's' }
}