import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import { MoneyField } from './MoneyField'

export default {
  title: 'Core Labs/Money/MoneyField',
  component: MoneyField,
}

type Story = StoryObj<typeof MoneyField>

export const MoreExamples: Story = {
  render: () => <MoneyFieldExamples />,
}

const MoneyFieldExamples = () => {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Output</TableCell>
            <TableCell>Expected</TableCell>
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
              <TableCell>{example.expected}</TableCell>
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
    code: '<MoneyField source="price" currencySource="USD" record={{price: 1234}} />',
    component: (
      <MoneyField
        record={{ price: 1234 }}
        source="price"
        currencySource="USD"
      />
    ),
    expected: '$1234.00',
    desc: "MoneyField acts as a standard ReactAdmin field. The 'currencySource' prop is required.",
  },
  {
    code: '<MoneyField source="price" currencySource="USD" record={{price: 1234}} sourceFormat={\'cents\'} />',
    component: (
      <MoneyField
        record={{ price: 1234 }}
        source="price"
        currencySource="USD"
        sourceFormat={'cents'}
      />
    ),
    expected: '$12.34',
    desc: "MoneyField transforms cents to dollars when value is integer. It's common to store currency values as cents in financial systems to avoid rounding problems.",
  },
  {
    code: '<MoneyField source="price" currencySource="BHD" record={{price: 123450}} sourceFormat={\'cents\'} />',
    component: (
      <MoneyField
        record={{ price: 123450 }}
        source="price"
        currencySource="BHD"
        sourceFormat={'cents'}
      />
    ),
    expected: 'BHD 123.450',
    desc: 'MoneyField transforms 3-decimal currencies too.',
  },
  {
    code: '<MoneyField source="price" currencySource="USD" record={{price: "1000.12"}} />',
    component: (
      <MoneyField
        record={{ price: '1234.56' }}
        source="price"
        currencySource="USD"
      />
    ),
    expected: '$1234.56',
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
    expected: '$1000.50',
    desc: "The currency can be sourced from the record by specifying 'currencySource' prop.",
  },
  {
    code: '<MoneyField locales="de-DE" source="price.amount" currencySource="price.code" record={{price: {amount: 1005, code: "CNY"}} />',
    component: (
      <MoneyField
        source="price.amount"
        currencySource="price.code"
        locales="de-DE"
        record={{ price: { amount: 1005, code: 'CNY' } }}
      />
    ),
    expected: '1.005,00 CN¥',
    desc: 'It uses browser locale by default, but that can be specified. Currency symbol may be displayed on the left or right per the locale.',
  },
  {
    code: '<MoneyField locales="zh-CN" source="price.amount" currencySource="price.code" record={{price: {amount: 1005, code: "CNY"}} />',
    component: (
      <MoneyField
        source="price.amount"
        currencySource="price.code"
        locales="zh-CN"
        record={{ price: { amount: 1005, code: 'CNY' } }}
      />
    ),
    expected: '¥1,005.00',
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
