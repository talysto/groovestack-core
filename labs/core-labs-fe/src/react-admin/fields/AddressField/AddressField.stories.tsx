import type { Meta, StoryObj } from '@storybook/react'
import { AddressField } from '.'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core Labs/Fields/AddressField',
  component: AddressField,
  decorators: [withFormContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
} satisfies Meta<typeof AddressField>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'address',
  },
}
