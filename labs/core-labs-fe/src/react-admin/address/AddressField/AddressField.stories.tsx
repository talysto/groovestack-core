import type { StoryObj } from '@storybook/react'
import { AddressField } from './AddressField'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Address/AddressField',
  component: AddressField,
  // decorators: [withFormContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof AddressField>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'address',
  },
}
