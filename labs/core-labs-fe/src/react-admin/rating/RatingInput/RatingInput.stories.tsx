import { RatingProps, Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { RatingInput } from './RatingInput'

export default {
  title: 'Core Labs/Rating/RatingInput',
  component: RatingInput,
  decorators: [withFormContext],
  argTypes: {
    max: { control: 'number' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    precision: {
      control: 'select',
      options: [0.25, 0.5, 1],
    },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'componentProps', 'record', 'variant'],
    },
  },

  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type RatingPropsAndCustomArgs = ComponentProps<typeof RatingInput> & RatingProps
type Story = StoryObj<RatingPropsAndCustomArgs>

/**
 * RatingInput can take standard RA props (source, etc) and the MUI Rating props in the prop componentProps.
 */
/* TODO grab rating source value from the form in the decorator */

export const BasicUsage: Story = {
  args: {
    record: {
      rating: 3,
    },
    source: 'rating',
  },
  render: (args) => {
    const { max, size, precision } = args
    return (
      <Stack>
        <code>{JSON.stringify(args?.record, null, 2)}</code>
        <RatingInput componentProps={{ max, size, precision }} {...args} />
      </Stack>
    )
  },
}
