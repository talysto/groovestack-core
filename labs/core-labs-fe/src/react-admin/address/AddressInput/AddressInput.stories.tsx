import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { RaRecord, SaveButton, SimpleForm, Toolbar } from 'react-admin'
import { withReactAdminContext } from '../../../../../../stories/RAStorybookDecorators'
import { AddressInput } from './AddressInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Address/AddressInput',
  component: AddressInput,
  decorators: [withReactAdminContext],
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof AddressInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    source: 'address',
  },
  render: (args) => {
    // const { record, props } = args
    return (
      <SimpleForm record={{}} toolbar={<SimpleToolbar />} sx={{ p: 0 }}>
        <AddressInput {...args} />
      </SimpleForm>
    )
  },
}

interface ExampleType {
  record: RaRecord
  props: any
}

const examples = [
  { record: { id: 1 }, props: { required: true } },
  { record: { id: 2, address: 'Boulder, CO' }, props: { required: true } },
  {
    record: { id: 3, address: '5678 Elm St, Othertown, USA 67890' },
    props: {},
  },
  {
    record: { id: 3, address: '5678 Elm St, Othertown, USA 67890' },
    props: { validate: true, autocomplete: true },
  },
]

const SimpleToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
)

const Example = (p: ExampleType) => {
  const { record, props } = p
  return (
    <SimpleForm record={record} toolbar={<SimpleToolbar />} sx={{ p: 0 }}>
      <AddressInput source="address" {...props} />
    </SimpleForm>
  )
}

type ExampleStory = StoryObj<typeof Example>

export const Examples: ExampleStory = {
  render: (args) => (
    <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }}>
      {examples.map((example, idx) => (
        <Example key={idx} record={example.record} props={example.props} />
      ))}
    </Stack>
  ),
}
