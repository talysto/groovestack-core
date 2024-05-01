import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { RecordContextProvider, SimpleForm } from 'react-admin'
import { MoneyInput } from './MoneyInput'

export const MoneyInputLocaleByCurrencyTable = () => {
  const locales = [
    'en-US',
    'en-IN',
    'fr-FR',
    'de-DE',
    'ja-JP',
    'zn-CN',
    'zn-TW',
  ]
  const currencies = ['USD', 'EUR', 'JPY', 'CNY', 'BTC']

  const record = {
    id: '1',
    title: 'Integer Price',
    amount: 1000,
    price: { code: 'USD', amount: 2000 },
  }

  return (
    <RecordContextProvider value={record}>
      <SimpleForm toolbar={false} sx={{ p: 0 }}>
        <Table>
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
                    {/* <TextInput source='amount' /> */}

                    <MoneyInput
                      source="amount"
                      // currencySource="price.code"
                      // locales={locale}
                      currency={currency}
                      helperText={false}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SimpleForm>
    </RecordContextProvider>
  )
}
