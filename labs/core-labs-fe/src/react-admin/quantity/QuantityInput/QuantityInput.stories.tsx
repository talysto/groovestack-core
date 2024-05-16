import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { QuantityInput } from './QuantityInput'

export default {
  title: 'Core Labs/Quantity/QuantityInput',
  component: QuantityInput,
  decorators: [withFormContext],
  argTypes: {
    // max: { control: 'number' },
    // size: {
    //   control: 'select',
    //   options: ['small', 'medium', 'large'],
    // },
    // precision: {
    //   control: 'select',
    //   options: [0.25, 0.5, 1],
    // },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'record', 'variant'],
    },
  },

  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof QuantityInput>

/**
 * QuantityInput can take standard RA props (source, etc) and some other Quantity specific props.
 */
/* TODO grab qty source value from the form in the decorator */

export const BasicUsage: Story = {
  args: {
    record: {
      qty: 10,
    },
    source: 'qty',
  },
  render: (args) => {
    return (
      <Stack>
        <code>{JSON.stringify(args?.record, null, 2)}</code>
        {/* <QuantityInput source="newItem.qty" /> */}
        <QuantityInput {...args} />
      </Stack>
    )
  },
}
