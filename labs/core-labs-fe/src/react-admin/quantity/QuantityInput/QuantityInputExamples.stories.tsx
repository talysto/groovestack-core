import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import {
  useEditContext,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin'
import { withEditFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { JsonDisplay } from '../../JsonDisplay'
import { QuantityInput, QuantityInputMode } from './QuantityInput'

export default {
  title: 'Core Labs/Quantity/QuantityInput',
  component: QuantityInput,
  decorators: [withEditFormContext],
}

type Story = StoryObj<typeof QuantityInput>

export const MoreExamples: Story = {
  render: () => <QuantityInputExamples />,
}

const FieldOutput = () => {
  const record = useRecordContext()
  return JsonDisplay({ qty: record?.qty })
}

const ControlledQtyExample = () => {
  // const qty = useRecordContext()
  // console.log('useRecordContext', qty)
  const { record, save } = useEditContext()

  const notify = useNotify()
  const refresh = useRefresh()

  function onUpdateQty(newValue: number) {
    save?.(
      {
        qty: newValue,
      },
      {
        onSuccess: () => {
          refresh()
          notify('record updated', { type: 'info' })
        },
      },
    )
  }

  return (
    <QuantityInput
      source="qty"
      label="Quantity"
      mode={QuantityInputMode.Controlled}
      defaultValue={record.qty}
      min={0}
      max={10}
      onChangeSuccess={onUpdateQty}
    />
  )
}

const QuantityInputExamples = () => {
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
    code: '<QuantityInput source="qty" />',
    component: <QuantityInput source="qty" />,
    desc: 'QuantityInput acts as a standard React Admin Input.',
  },
  {
    code: `<QuantityInput source="qty" label="Quantity" defaultValue={3}  min={0} max={10}  />`,
    component: (
      <QuantityInput
        source="qty"
        label="Quantity"
        defaultValue={3}
        min={0}
        max={10}
      />
    ),
    desc: 'An example of the input with bounds on it.',
  },
  {
    code: `<QuantityInput source="qty" mode={QuantityInputMode.Controlled} defaultValue={record.qty} onChangeSuccess={onUpdateQty} label="Quantity" defaultValue={record.qty} min={0} max={10} />`,
    component: <ControlledQtyExample />,
    desc: 'An example of the controlled version of the input. NOTE code to update the qty field is omitted in this code snippet for brevity. Additionally on the Edit component, the property mode MUST be set to optimistic.',
  },
]
