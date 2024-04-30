import type { Meta, StoryObj } from '@storybook/react'
import { withFormContext } from '../../../stories/RAStorybookDecorators'
import {AddressInput} from '../src/react-admin/inputs/AddressInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core Labs/Inputs/AddressInput',
  component: AddressInput,
  decorators: [withFormContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
} satisfies Meta<typeof AddressInput>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'address',
  },
}
