import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { RatingInput } from './RatingInput'

export default {
  title: 'Core Labs/Rating/RatingInput',
  component: RatingInput,
  decorators: [withFormContext],

  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof RatingInput>

/**
 * RatingInput can take standard RA props (source, etc) and the MUI Rating props in the prop componentProps.
 */

{/* TODO grab rating source value from the form in the decorator */}
export const BasicUsage: Story = {
  args: {
    record: {
      rating: 3
    },
    variant: 'outlined',
  },
  render: (args) => (
    <Stack>
      <code>{JSON.stringify(args?.record, null, 2)}</code>
      <RatingInput
        // {...args} 
        source="rating"
      />
    </Stack>
  ),
}
