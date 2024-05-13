import { Typography } from '@mui/material'
import { StoryObj } from '@storybook/react'
import { SimpleShowLayout } from 'react-admin'
import { RatingField } from './RatingField'

export default {
  title: 'Core Labs/Rating/RatingField',
  component: RatingField,
  argTypes: {
    // roundWhole: { control: 'boolean' },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar'],
    },
  },
  tags: ['autodocs'],
}

type Story = StoryObj<typeof RatingField>

/**
 * RatingField can take a currency prop as an atomic value or an object.
 */
export const Basic: Story = {
  args: {
    record: {
      id: 1,
      rating: 4,
    },
    source: 'rating',
  },
  decorators: [
    (Story, context) => {
      const { record, ...rest } = context.args
      return (
        <SimpleShowLayout record={record}>
          <Typography variant="body2">SimpleShowLayout</Typography>
          <Story {...rest} />
        </SimpleShowLayout>
      )
    },
  ],
}
