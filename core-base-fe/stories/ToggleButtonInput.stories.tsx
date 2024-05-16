import type { Meta, StoryObj } from '@storybook/react'
import { required } from 'react-admin'
import { withFormContext } from '../../stories/RAStorybookDecorators'
import { ToggleButtonInput } from '../src/react-admin/inputs/ToggleButtonInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core Base/Inputs/ToggleButtonInput',
  component: ToggleButtonInput,
  decorators: [withFormContext],
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleButtonInput>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'option',
    choices: [
      { id: 'sm', name: 'SM' },
      { id: 'md', name: 'MD' },
      { id: 'lg', name: 'LG' },
    ]
  },
}

export const Required: Story = {
  args: {
    source: 'option',
    validate: [required()],
  },
}
