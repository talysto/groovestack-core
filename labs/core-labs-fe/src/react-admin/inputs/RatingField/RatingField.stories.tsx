import { RatingProps, Typography } from '@mui/material'
import { StoryObj } from '@storybook/react'
import { SimpleShowLayout } from 'react-admin'
import { RatingField } from './RatingField'
import { ComponentProps } from 'react'

export default {
  title: 'Core Labs/Rating/RatingField',
  component: RatingField,
  argTypes: {
    max: { control: 'number' },
    // size: { control: 'text' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'componentProps', 'record'],
    },
  },
  tags: ['autodocs'],
}
type RatingPropsAndCustomArgs = ComponentProps<typeof RatingField> & RatingProps
type Story = StoryObj<RatingPropsAndCustomArgs>

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
  render: (args) => {
    const { max, size, ...rest } = args
    return <RatingField componentProps={{max, size}} {...rest} />
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
