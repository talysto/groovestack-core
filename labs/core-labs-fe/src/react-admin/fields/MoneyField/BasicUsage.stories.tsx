import { StoryObj } from '@storybook/react'

import { MoneyField } from './MoneyField'
import { ListContextProvider, ShowContextProvider, SimpleShowLayout, Datagrid, Show } from 'react-admin'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'


export default {
  title: 'Core Labs/Fields/MoneyField',
  component: MoneyField,
  argTypes: {
    truncate: { control: 'boolean' },
    record: {control: 'object'},
    source: {control: 'text'}
  },
}

type Story = StoryObj<typeof MoneyField>

export const Basic: Story = {
  args: {
    record: { id: 1, amount: 123.45, currency: 'USD', cost: { amount: 50.00, currency: 'JPY' }  },
    source: 'amount',
    currencySource: 'currency',
    displayWhenZero: 'zero'
  }
}