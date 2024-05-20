import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { QuantityInput, QuantityInputMode } from './QuantityInput'
import { useEditContext, useNotify, useRecordContext, useRefresh } from 'react-admin'

export default {
  title: 'Core Labs/quantity/QuantityInput',
  component: QuantityInput,
  decorators: [withFormContext],
}

type Story = StoryObj<typeof QuantityInput>

export const MoreExamples: Story = {
  render: () => <QuantityInputExamples />,
}

// const ControlledQtyExample = () => {
//   const qty = useRecordContext()
//   const notify = useNotify()
//   const refresh = useRefresh()
//   const { record, save } = useEditContext()
//   console.log(record?.qty2)
//   console.log(qty)

//   function onUpdateQty(newValue: number) {
//     save?.(
//       {
//         qty: qty,
//       },
//       {
//         onSuccess: () => {
//           refresh()
//           notify('record updated', { type: 'info' })
//         },
//       },
//     )
//   }

//   return (
//     <QuantityInput
//       source="qty2"
//       label="Quantity 2"
//       mode={QuantityInputMode.Controlled}
//       defaultValue={record.qty2}
//       min={0}
//       max={10}
//       onChangeSuccess={onUpdateQty}
//     />
//   )
// }

const QuantityInputExamples = () => {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Output</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examples.map((example, idx) => (
            <TableRow key={idx}>
              <TableCell>
                {/* <Source code={example.code} /> */}
                <code>{example.code}</code>
              </TableCell>
              <TableCell>{example.component}</TableCell>
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
    code: `<QuantityInput source="qty2" label="Quantity 2" defaultValue={3}  min={0} max={10}  />`,
    component: (
      <QuantityInput
        source="qty2"
        label="Quantity 2"
        defaultValue={3}
        min={0}
        max={10}
      />
    ),
    desc: 'An example of the input with bounds on it.',
  },
  // {
  //   code: `<QuantityInput source="qty2" label="Quantity 2" defaultValue={3}  min={0} max={10}  />`,
  //   component: (
  //     <ControlledQtyExample/> ),
  //   desc: 'An example of the input with bounds on it.',
  // },
]

