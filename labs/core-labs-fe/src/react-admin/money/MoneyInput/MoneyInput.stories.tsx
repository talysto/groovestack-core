import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { MoneyInput } from './MoneyInput'
// import { MoneyInputLocaleByCurrencyTable } from './MoneyInputLocaleByCurrencyTable.stories.tsx.ex'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Money/MoneyInput',
  component: MoneyInput,
  decorators: [withFormContext],
  // parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Default: Story = {
//   args: {
//     source: 'amount',
//   },
// }

/**
 * MoneyField can take a currency prop as an atomic value or an object.
 */
export const BasicUsage: Story = {
  args: {
    record: {
      price: 123.45,
      cost: '$50.00',
      currency: 'USD',
      nested: { amount: 2000, currency: 'USD' },
    },
    variant: 'outlined',
    // source: 'amount',
    // currencySource: 'currency',
    // displayWhenZero: 'zero',
  },
  render: (args) => (
    <Stack>
      <code>{JSON.stringify(args?.record, null, 2)}</code>
      {/* <MoneyInput {...args} source="amount" currencySource="currency" /> */}
      <MoneyInput {...args} source="price" currencySource="currency" />
      {/* <MoneyInput {...args} source="price" currencySource="currency" />
      <MoneyInput {...args} source="price" currencySource="USD" />
      <MoneyInput {...args} source="price" currencySource="CNY" /> */}
      {/* <MoneyInput {...args} source="create_value" currencySource="USD" />
      <MoneyInput
        {...args}
        source="create_value"
        currencySource="JPY"
        validate={[required()]}
      /> */}
      {/* <MoneyInput {...args} source="cost" /> */}
    </Stack>
  ),
  // decorators: [
  //   (Story, context) => {
  //     const { record, ...rest } = context.args
  //     return (
  //       <SimpleShowLayout record={record}>
  //         <Typography variant="body2">SimpleShowLayout</Typography>
  //         <Story {...rest} />
  //       </SimpleShowLayout>
  //     )
  //   },
  // ],
}
