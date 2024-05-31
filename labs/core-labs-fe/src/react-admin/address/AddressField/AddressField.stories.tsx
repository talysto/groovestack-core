import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { SimpleShowLayout } from 'react-admin'
import { AddressField, AddressFieldProps } from './AddressField'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Address/AddressField',
  component: AddressField,
  // decorators: [withFormContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    format: {
      options: ['singleline', 'multiline', 'stacked'],
      control: { type: 'radio' },
    },
  },
}

type Story = StoryObj<typeof AddressField>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicUsage: Story = {
  // args: {
  //   source: 'address',
  // },
  render: (Story, context) => <AddressFieldScenarios {...context.args} />,
}

const scenarios = [
  {
    scenario: 'String format',
    address: '1234 Main St, Springfield, IL 62701 USA',
  },
  {
    scenario: 'Object format',
    address: {
      street: '1234 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      country: 'USA',
    },
  },
  {
    scenario: 'Multiline string format',
    address: '1234 Main St\nSpringfield, IL 62701\nUSA',
  },
  { scenario: 'Partial string (street only)', address: '1234 Main St' },
  { scenario: 'Partial string (city only)', address: 'Las Vegas' },
]

const AddressFieldScenarios = (args: AddressFieldProps) => {
  return (
    <Stack>
      {scenarios.map(({ scenario, address }) => (
        <SimpleShowLayout record={{ address }}>
          <AddressField
            source="address"
            label={scenario}
            record={{ address }}
            {...args}
          />
        </SimpleShowLayout>
      ))}
    </Stack>
  )
}
