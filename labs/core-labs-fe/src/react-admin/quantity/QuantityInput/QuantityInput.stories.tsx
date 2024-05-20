import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { QuantityInput } from './QuantityInput'

export enum QuantityInputMode {
  Controlled,
  Uncontrolled,
}

export default {
  title: 'Core Labs/Quantity/QuantityInput',
  component: QuantityInput,
  decorators: [withFormContext],
  // args: {
  //   onChangeSuccess: (value: number) => console.log('onChangeSuccess', value),
  //   // onClick: fn(),
  //   },
  argTypes: {
    defaultValue: { control: 'number' },
    mode: {
      options: [0, 1],
      mapping: [0, 1], 
      control: {
        type: 'select', 
        labels: ['Controlled', 'Uncontrolled'],
      },
    },
    onChangeSuccess: { action: 'onChangeSuccess Value' },
    // ref: { control: 'object' },
    min: { control: 'number' },
    max: { control: 'number' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    props: { control: 'object' },
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
 * QuantityInput can take standard RA TextInputProps (source, etc) and other Quantity specific props.
 */

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
