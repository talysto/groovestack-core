import { Typography } from '@mui/material'
import { StoryObj } from '@storybook/react'
import { SimpleShowLayout } from 'react-admin'
import { MoneyField } from './MoneyField'
import { MoneyFieldExamples } from './MoneyFieldExamples'
import { MoneyFieldLocaleByCurrencyTable } from './MoneyFieldLocaleByCurrencyTable'

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

type LocalesStory = StoryObj<typeof MoneyFieldLocaleByCurrencyTable>

/**
 * Browser Locales are used to format the currency based on the user. Locales can be explictly set with the 'locales' prop.
 * This table shows some of the display variations of locales vs currency.
 */
export const LocalesVsCurrency: LocalesStory = {
  argTypes: {
    amount: { control: 'number' },
    // roundWhole: { control: 'boolean' },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  args: { amount: 1234.56 },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'currencySource'],
    },
  },
  render: (args) => <MoneyFieldLocaleByCurrencyTable {...args} />,
}

/**
 * The data shape for records can be flat, ie `price` and `currency` are at the same level, or nested, ie `price` is an object with `amount` and `currency` properties.
 */
export const MoreExamples: Story = {
  render: () => <MoneyFieldExamples />,
}

// type FieldStory = StoryObj<typeof MoneyField>

// export const OtherStories: Story = {
//   render: () => <MoneyInputAndFieldVariations />
// };
