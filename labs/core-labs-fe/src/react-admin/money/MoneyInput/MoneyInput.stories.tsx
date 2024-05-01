import type { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { MoneyInput } from './MoneyInput'
import { MoneyInputLocaleByCurrencyTable } from './MoneyInputLocaleByCurrencyTable'

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

export const Localization: Story = {
  render: () => <MoneyInputLocaleByCurrencyTable />,
}
