import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { MoneyField } from './MoneyField'
import { MoneyFieldLocaleByCurrencyTable } from './MoneyFieldLocaleByCurrencyTable'
import { StoryObj } from '@storybook/react'

const recordsA = [
  { id: '1', title: 'Integer Price', price: 1000 },
  { id: '2', title: 'Decimal Price', price: 1000.5 },
  { id: '3', title: 'String/Integer Price', price: '1000' },
  { id: '4', title: 'String/Decimal Price', price: '1000.50' },
]
const recordsB = [
  {
    id: '5',
    title: 'ISO 4217 Integer',
    price: { code: 'USD', amount: 1000, display: '$1000' },
  },
  {
    id: '6',
    title: 'ISO 4217 Float',
    price: { code: 'USD', amount: 1000.5, display: '$1000.00' },
  },
  {
    id: '7',
    title: 'ISO 4217 String',
    price: { code: 'USD', amount: '1000.5' },
  },
]

// export const MoneyInputAndFieldVariations = () => {
//   const listA = useList({ data: recordsA, isLoading: false })
//   const listB = useList({ data: recordsB, isLoading: false })

//   return (
//     <Paper>
//       <Stack spacing={3} sx={{ p: 2 }}>
//         <Typography variant="h5">MoneyInput</Typography>
//         {/* <MoneyInputLocaleByCurrencyTable /> */}

//         <Typography variant="h5">MoneyField</Typography>
//         <ListContextProvider value={listA}>
//           <Datagrid bulkActionButtons={false}>
//             <TextField source="title" />
//             <MoneyField source="price" currency="USD" />
//             <WrapperField label="MoneyInput (GS Base)">
//               <SimpleForm toolbar={false} sx={{ p: 0 }}>
//                 <MoneyInput source="price" helperText={false} currency="USD" />
//               </SimpleForm>
//             </WrapperField>
//             <FunctionField
//               label="Data Shape"
//               render={(record) => <code>{JSON.stringify(record)}</code>}
//             />
//           </Datagrid>
//         </ListContextProvider>

//         <ListContextProvider value={listB}>
//           <Datagrid bulkActionButtons={false}>
//             <TextField source="title" />
//             <MoneyField source="price.amount" currencySource="price.code" />
//             <WrapperField label="MoneyInput (GS Base)">
//               <SimpleForm toolbar={false} sx={{ p: 0 }}>
//                 <MoneyInput source="price" helperText={false} currency="USD" />
//               </SimpleForm>
//             </WrapperField>
//             <FunctionField
//               label="Data Shape"
//               render={(record) => <code>{JSON.stringify(record)}</code>}
//             />
//           </Datagrid>
//         </ListContextProvider>

//       </Stack>
//     </Paper>
//   )
// }

const examples = [
  {
    code: '<MoneyField source="price" currency="USD" record={{price: 1000}} />',
    component: (
      <MoneyField record={{ price: 1000 }} source="price" currencySource="USD" />
    ),
    desc: "MoneyField acts as a standard ReactAdmin field. The 'currency' prop is required.",
  },
  {
    code: '<MoneyField source="price" currency="USD" record={{price: "1000.12"}} />',
    component: (
      <MoneyField record={{ price: '1000.12' }} source="price" currencySource="USD" />
    ),
    desc: 'The value can be a string, an integer or a float. It will be cooerced into a float for formatting.',
  },
  {
    code: '<MoneyField source="price.amount" currencySource="price.code" record={{price: {amount: 1000.50, code: "USD"}} />',
    component: (
      <MoneyField
        source="price.amount"
        currencySource="price.code"
        record={{ price: { amount: 1000.5, code: 'USD' } }}
      />
    ),
    desc: "The currency can be sourced from the record by specifying 'currencySource' prop.",
  },
  {
    code: '<MoneyField locales="de-DE" source="price.amount" currencySource="price.code" record={{price: {amount: 1000.50, code: "CNY"}} />',
    component: (
      <MoneyField
        source="price.amount"
        currencySource="price.code"
        locales="de-DE"
        record={{ price: { amount: 1000.5, code: 'CNY' } }}
      />
    ),
    desc: 'It uses browser locale by default, but that can be specified. Currency symbol may be displayed on the left or right per the locale.',
  },
  {
    code: '<MoneyField source="price.amount" currencySource="price.code" record={{price: {amount: 1000.5013, code: "BTC"}} />',
    component: (
      <MoneyField
        source="price.amount"
        currencySource="price.code"
        record={{ price: { amount: 1000.5013, code: 'BTC' } }}
      />
    ),
    desc: 'Crypto currencies can be specified as well.',
  },
]

const MoneyFieldUsages = () => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Example</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examples.map((example, idx) => (
            <TableRow>
              <TableCell>
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

export default {
  title: 'Core Labs/Fields/MoneyField',
  component: MoneyField,
  // decorators: [withFormContext],
  // parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
  // argTypes: {
  //   truncate: { control: 'boolean' },
  //   value: {control: 'number'}
  // },
} // satisfies Meta<typeof MoneyInput>

// export default meta
type Story = StoryObj<typeof MoneyField>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const UsageExamples: Story = {
  render: () => <MoneyFieldUsages />
}

export const Localized: Story = {
  render: () => <MoneyFieldLocaleByCurrencyTable />,
}

// export const OtherStories: Story = {
//   render: () => <MoneyInputAndFieldVariations />
// };
