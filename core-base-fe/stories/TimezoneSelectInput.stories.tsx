import type { Meta, StoryObj } from '@storybook/react'
import { withFormContext  } from '../../stories/RAStorybookDecorators'
import { TimezoneSelectInput } from '../src/react-admin/inputs/TimezoneSelectInput'
import { required } from 'react-admin';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React Admin/Inputs/TimezoneSelectInput',
  component: TimezoneSelectInput,
  decorators: [withFormContext],
  tags: ['autodocs'],  // https://storybook.js.org/docs/react/writing-docs/autodocs,
  parameters: { layout: 'centered'}
} satisfies Meta<typeof TimezoneSelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'timezone'
  }
}

export const Required: Story = {
  args: {
    source: 'timezone',
    validate: [required()]
  }
}