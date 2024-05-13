import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { StoryObj } from '@storybook/react'
import { RecordContextProvider, SimpleForm } from 'react-admin'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { MoneyInput } from './MoneyInput'

const MoneyInputLocaleByCurrencyTable = () => {
  const locales = [
    'en-US',
    'en-IN',
    'fr-FR',
    'de-DE',
    'ja-JP',
    'zn-CN',
    'zn-TW',
  ]
  const currencies = [
    'USD',
    'EUR',
    'JPY',
    'CNY',
    // 'BTC'
  ]

  const record = {
    price: 1000,
    currency: 'USD',
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
                      source="price"
                      currencySource={currency}
                      // currencySource="price.code"
                      locales={locale}
                      helperText={false}
                      variant="outlined"
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

export default {
  title: 'Core Labs/Money/MoneyInput',
  component: MoneyInput,
  decorators: [withFormContext],
  // parameters: { layout: 'centered' },
  // tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof MoneyInput>

export const Localization: Story = {
  args: {
    record: {
      price: 123.45,
      currency: 'USD',
    },
    variant: 'outlined',
  },
  render: () => <MoneyInputLocaleByCurrencyTable />,
}
