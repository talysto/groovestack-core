import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { MoneyField } from './MoneyField'

export default {
  title: 'Core Labs/Money/MoneyField',
  component: MoneyField,
  // argTypes: {
  //   // roundWhole: { control: 'boolean' },
  //   // record: {control: 'object'},
  //   // source: {control: 'text'}
  // },
  // parameters: {
  //   controls: {
  //     expanded: true,
  //     exclude: ['sx', 'bar'],
  //   },
  // },
  // tags: ['autodocs'],
}

type LocalesStory = StoryObj<typeof MoneyFieldLocaleByCurrencyTable>

/**
 * Browser Locales are used to format the currency based on the user. Locales can be explictly set with the 'locales' prop.
 * This table shows some of the display variations of locales vs currency.
 */
export const LocalesVsCurrency: LocalesStory = {
  argTypes: {
    amount: { control: 'number' },
    // roundWhole: { control: 'boolean' },
    // record: {control: 'object'},
    // source: {control: 'text'}
  },
  args: { amount: 1234.56 },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'currencySource'],
    },
  },
  render: (args) => <MoneyFieldLocaleByCurrencyTable {...args} />,
}

interface MoneyFieldLocaleByCurrencyTableProps {
  amount: number
}

const MoneyFieldLocaleByCurrencyTable = (
  props: MoneyFieldLocaleByCurrencyTableProps,
) => {
  const locales = [
    'en-US',
    'en-IN',
    'fr-FR',
    'de-DE',
    'ja-JP',
    'zn-CN',
    'zn-TW',
  ]
  const currencies = ['USD', 'EUR', 'JPY', 'INR', 'CNY'] // , 'BTC', 'ETH'

  const { amount, ...rest } = props

  const record = {
    id: '1',
    title: 'Integer Price',
    price: { code: 'USD', amount: amount },
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Currency/Locale</TableCell>
            {currencies.map((currency, idx) => (
              <TableCell key={idx}>{currency}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {locales.map((locale, idx) => (
            <TableRow key={idx}>
              <TableCell>{locale}</TableCell>
              {currencies.map((currency, idx) => (
                <TableCell key={idx}>
                  <MoneyField
                    {...rest}
                    record={record}
                    source="price.amount"
                    locales={locale}
                    currencySource={currency}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
