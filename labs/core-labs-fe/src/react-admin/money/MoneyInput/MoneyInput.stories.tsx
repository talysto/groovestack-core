import { Box, Stack, Typography } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { FormEventHandler, useState } from 'react'
import {
  AdminContext,
  SimpleForm,
  TextInput,
  defaultI18nProvider,
  testDataProvider,
} from 'react-admin'
import { MoneyInput } from './MoneyInput'
// import { MoneyInputLocaleByCurrencyTable } from './MoneyInputLocaleByCurrencyTable.stories.tsx.ex'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core Labs/Money/MoneyInput',
  component: MoneyInput,
  // decorators: [withFormContext],
  // parameters: { layout: 'centered' },
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type Story = StoryObj<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Default: Story = {
//   args: {
//     source: 'amount',
//   },
// }

/**
 * MoneyField can take a currency prop as an atomic value or an object.
 */
export const BasicUsage: Story = {
  args: {
    record: {
      id: 7,
      title: 'Book',
      price: 123.45,
      currency: 'USD',
    },
    // variant: 'outlined',
    // source: 'amount',
    // currencySource: 'currency',
    // displayWhenZero: 'zero',
  },
  render: (args) => (
    <>
      <MoneyInput {...args} source="price" currencySource="currency" />
      <MoneyInput
        {...args}
        source="price"
        // sourceFormat="cents"
        allowMinorUnits
        currencySource="currency"
      />
    </>
  ),
  decorators: [
    (Story, context) => {
      const { record, ...rest } = context.args
      // const [vals, setVals] = useState({})

      const changed: FormEventHandler<HTMLDivElement> = (e) => {
        console.log(e.target.value)
        // setVals(data)
      }

      return (
        <AdminContext
          i18nProvider={defaultI18nProvider}
          dataProvider={{
            ...testDataProvider(),
            // getCompletion: delayedPromise({
            //   data: ' dolor sit amet',
            // }),
          }}
        >
          <Stack direction="row">
            <Box sx={{ flex: 1 }}>
              <SimpleForm record={record} onChange={changed}>
                <Typography variant="body2">MoneyInput on a form</Typography>
                <TextInput source="title" />
                <Story {...rest} />
              </SimpleForm>
            </Box>
            <Box sx={{ flex: 1, p: 5 }}>
              <pre>{JSON.stringify(record, null, 2)}</pre>
              <hr />
              <pre>{JSON.stringify(vals, null, 2)}</pre>
            </Box>
          </Stack>
        </AdminContext>
      )
    },
  ],
}
