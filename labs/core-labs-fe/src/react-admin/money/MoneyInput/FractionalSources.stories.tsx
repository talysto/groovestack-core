import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { StoryObj } from '@storybook/react'
import { SimpleForm } from 'react-admin'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { MoneyInput } from './MoneyInput'

const MoneyInputSourceFractionsTable = () => {
  const scenarios = [
    {
      name: 'Default props',
      sourceFormat: 'majorUnit', // 'cents' | 'majorUnit'
      allowMinorUnits: false,
    },
    {
      sourceFormat: 'majorUnit',
      allowMinorUnits: true,
    },
    {
      sourceFormat: 'cents',
      allowMinorUnits: true,
    },
    {
      sourceFormat: 'cents',
      allowMinorUnits: false,
    },
  ]

  const currencies = ['USD', 'BHD', 'JPY']

  const recordMajor = {
    price: 12345,
  }

  const recordMinor = {
    price: 12345,
  }

  return (
    // <RecordContextProvider value={record}>
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
          {scenarios.map((scenario, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <pre>{JSON.stringify(scenario, null, 2)}</pre>
              </TableCell>
              {currencies.map((currency, idx) => (
                <TableCell key={idx}>
                  {/* <TextInput source='amount' /> */}

                  <MoneyInput
                    record={
                      scenario.sourceFormat == 'majorUnit'
                        ? recordMajor
                        : recordMinor
                    }
                    source="price"
                    currencySource={currency}
                    allowMinorUnits={scenario.allowMinorUnits}
                    sourceFormat={scenario.sourceFormat}
                    // currencySource="price.code"
                    // locales={locale}
                    // helperText={false}
                    variant="outlined"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SimpleForm>
    // </RecordContextProvider>
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

export const FractionalSources: Story = {
  render: () => <MoneyInputSourceFractionsTable />,
}
