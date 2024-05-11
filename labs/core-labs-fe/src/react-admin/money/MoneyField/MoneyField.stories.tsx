import { Typography } from '@mui/material'
import { StoryObj } from '@storybook/react'
import { SimpleShowLayout } from 'react-admin'
import { MoneyField } from './MoneyField'
// import { MoneyFieldLocaleByCurrencyTable } from './MoneyFieldLocaleByCurrencyTable.stories'

export default {
  title: 'Core Labs/Money/MoneyField',
  component: MoneyField,
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

type Story = StoryObj<typeof MoneyField>

/**
 * MoneyField can take a currency prop as an atomic value or an object.
 */
export const Basic: Story = {
  args: {
    record: {
      id: 1,
      amount: 123.45,
      currency: 'USD',
      cost: { amount: 50.0, currency: 'JPY' },
    },
    source: 'amount',
    currencySource: 'currency',
    displayWhenZero: 'zero',
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
