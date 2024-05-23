import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { useRecordContext } from 'react-admin'
import { withEditFormContext } from '../../stories/RAStorybookDecorators'
import { ToggleButtonInput } from '../src/react-admin/inputs/ToggleButtonInput'
import React from 'react'

const FieldOutput = () => {
  const record = useRecordContext()
  return (
    <code style={{ whiteSpace: 'nowrap' }}>
      {JSON.stringify({ size: record?.size }, null, 2)}
    </code>
  )
}

const meta = {
  title: 'Core Base/Inputs/ToggleButtonInput',
  component: ToggleButtonInput,
  decorators: [withEditFormContext],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleButtonInput>

export default meta

type Story = StoryObj<typeof meta>

export const MoreExamples: Story = {
  render: () => <QuantityInputExamples />,
}

const QuantityInputExamples = () => {
  const record = useRecordContext()
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Output</TableCell>
            <TableCell>Field from Record</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examples.map((example, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <code>{example.code}</code>
              </TableCell>
              <TableCell>{example.component}</TableCell>
              <TableCell>
                <FieldOutput />
              </TableCell>
              <TableCell>{example.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
const examples = [
  {    
    code: '<ToggleButtonInput source="size" choices={[{ id: "sm", name: "SM" }, { id: "md", name: "MD" }, { id: "lg", name: "LG" }]} />',
    component: (
      <ToggleButtonInput
        source="size"
        choices={[
          { id: 'sm', name: 'SM' },
          { id: 'md', name: 'MD' },
          { id: 'lg', name: 'LG' },
        ]}
      />
    ),
    desc: 'ToggleButtonInput acts as a standard React Admin Input.',
  },
  {
    code: "<ToggleButtonInput source='size' orientation='vertical' size='small' choices={[{ id: 'sm', name: 'SM' }, { id: 'md', name: 'MD' }, { id: 'lg', name: 'LG' }, { id: 'xl', name: 'XL' }, { id: 'xxl', name: 'XXL' }]} />",
    component: (
      <ToggleButtonInput
        source="size"
        orientation='vertical'
        size='small'
        choices={[
          { id: 'sm', name: 'SM' },
          { id: 'md', name: 'MD' },
          { id: 'lg', name: 'LG' },
          { id: 'xl', name: 'XL' },
          { id: 'xxl', name: 'XXL' },
        ]}
      />
    ),
    desc: 'ToggleButtonInput using a larger list of choices and configuring other display options.',
  },

  //TODO - add example of ReferenceInput as parent populating the choices?
  {
    code: '<ToggleButtonInput source="size" />',
    component: (
      <ToggleButtonInput
        source="size"
      />
    ),
    desc: 'ToggleButtonInput using a __ instead of choices, this can also be populated by a filter as well (https://marmelab.com/react-admin/RadioButtonGroupInput.html#choices)',
  },
  // {
  //   code: `<ToggleButtonInput source="qty" label="Quantity" defaultValue={3}  min={0} max={10}  />`,
  //   component: (
  //     <ToggleButtonInput
  //       source="qty"
  //       label="Quantity"
  //       defaultValue={3}
  //       min={0}
  //       max={10}
  //     />
  //   ),
  //   desc: 'An example of the input with bounds on it.',
  // },
  // {
  //   code: `<ToggleButtonInput source="qty" mode={QuantityInputMode.Controlled} defaultValue={record.qty} onChangeSuccess={onUpdateQty} label="Quantity" defaultValue={record.qty} min={0} max={10} />`,
  //   component: <ControlledQtyExample />,
  //   desc: 'An example of the controlled version of the input. NOTE code to update the qty field is omitted in this code snippet for brevity. Additionally on the Edit component, the property mode MUST be set to optimistic.',
  // },
]
