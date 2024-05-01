import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { RaRecord, SimpleForm } from 'react-admin'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { AddressInput } from './AddressInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Address/AddressInput',
  component: AddressInput,
  decorators: [withFormContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof AddressInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'address',
  },
}

interface ExampleType {
  record: RaRecord
  props: any
}

const examples = [
  { record: { id: 1, address: 'Boulder, CO' }, props: {} },
  {
    record: { id: 2, address: '5678 Elm St, Othertown, USA 67890' },
    props: {},
  },
]

const Example = (p: ExampleType) => {
  const { record, props } = p
  return (
    <SimpleForm record={record} toolbar={false}>
      <AddressInput record={record} source="address" {...props} />
    </SimpleForm>
  )
}

type ExampleStory = StoryObj<typeof Example>

export const Examples: ExampleStory = {
  render: (args) => (
    <Stack direction="row">
      {examples.map((example, idx) => (
        <Example key={idx} record={example.record} props={example.props} />
      ))}
    </Stack>
  ),
}
