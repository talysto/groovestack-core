import type { Meta, StoryObj } from '@storybook/react'
import { withFormContext  } from '../../stories/RAStorybookDecorators'
import { MoneyInput } from '../src/react-admin/inputs/MoneyInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React Admin/Inputs/MoneyInput',
  component: MoneyInput,
  decorators: [withFormContext],
  parameters: { layout: 'centered'},
  tags: ['autodocs']  // https://storybook.js.org/docs/react/writing-docs/autodocs
} satisfies Meta<typeof MoneyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'amount'
  }
}