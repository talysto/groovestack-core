import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { MoneyField } from './MoneyField'

export const MoneyFieldExamples = () => {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Example</TableCell>
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
    code: '<MoneyField source="price" currencySource="USD" record={{price: 1000}} />',
    component: (
      <MoneyField
        record={{ price: 1000 }}
        source="price"
        currencySource="USD"
      />
    ),
    desc: "MoneyField acts as a standard ReactAdmin field. The 'currency' prop is required.",
  },
  {
    code: '<MoneyField source="price" currencySource="USD" record={{price: "1000.12"}} />',
    component: (
      <MoneyField
        record={{ price: '1000.12' }}
        source="price"
        currencySource="USD"
      />
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
  // {
  //   code: '<MoneyField source="price.amount" currencySource="price.code" record={{price: {amount: 1000.5013, code: "BTC"}} />',
  //   component: (
  //     <MoneyField
  //       source="price.amount"
  //       currencySource="price.code"
  //       record={{ price: { amount: 1000.5013, code: 'BTC' } }}
  //     />
  //   ),
  //   desc: 'Crypto currencies can be specified as well.',
  // },
]
