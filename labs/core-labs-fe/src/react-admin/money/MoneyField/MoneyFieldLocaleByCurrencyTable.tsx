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

interface MoneyFieldLocaleByCurrencyTableProps {
  amount: number
}

export const MoneyFieldLocaleByCurrencyTable = (
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
