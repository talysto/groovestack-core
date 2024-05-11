import { InputAdornment } from '@mui/material'
import _ from 'lodash'
import { forwardRef, useState } from 'react'
import { TextInput, useRecordContext } from 'react-admin'
import {
  NumberFormatBase,
  NumberFormatValues,
  NumericFormatProps,
} from 'react-number-format'
import { MoneyInputProps } from './MoneyInputProps.js'

/**
 * MoneyInput is a React Admin input that supports editing a currency value.
 *
 * FEATURES
 * - Full Il8n currency support
 * - Mobile friendly numeric input
 * - Currency specified by record or explicity via 'currencySource' prop
 *
 * TODO
 * - Refactor to simpler MUI pattern
 * - Handle whole values on mode
 * - Validate cents transforms mode
 * - Support Negative values
 */
export const MoneyInput = ({
  currencySource,
  record: recordProp,
  ...rest
}: MoneyInputProps) => {
  const [values, setValues] = useState<NumberFormatValues>()

  const data = useRecordContext()
  // const [value, setValue] = useState<string>()

  const record = recordProp || data

  if (!record) return

  console.log('record: ', JSON.stringify(record))
  console.log('cv: ', _.get(record, currencySource))

  const currencyValue = _.get(record, currencySource) || currencySource

  if (!Intl.supportedValuesOf('currency').includes(currencyValue)) {
    const err = `Currency '${currencyValue}' for ${currencySource} not supported.  Specify the source for the currency, ie 'price' or 'price.amount' OR an explicit ISO 4217 currency code, ie USD, JPY`
    console.error(err)
  }

  // TODO: Remove this :any and resolve this warning
  const handleChange = (v: any) => {
    console.log('handleChange', JSON.stringify(v))
    setValues(v)
  }

  function getPrefixSuffix() {
    console.log('currencyValue:' + currencyValue)
    const parts = Intl.NumberFormat(rest.locales, {
      style: 'currency',
      currency: currencyValue,
    }).formatToParts(1234.56)

    console.log('parts: ' + JSON.stringify(parts))

    return parts[0].type == 'currency'
      ? [parts[0].value, '']
      : ['', parts.at(-1)?.value]
  }

  const [prefix, suffix] = getPrefixSuffix()

  const numericValue = parseFloat(
    record && rest.source && _.get(record, rest.source),
  )

  return (
    <TextInput
      InputProps={{
        // label="react-number-format-2"
        type: 'tel',
        value: values?.value || numericValue,
        onChange: handleChange,
        startAdornment: (
          <InputAdornment position="start">{prefix}</InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
        inputComponent: NumericFormatCustom as any,
      }}
      {...rest}
    />
  )
}

interface CustomProps {
  onChange: ({}) => void
  name: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    const format = (numStr: string) => {
      if (numStr === '') return ''
      const fmt = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }).format(parseFloat(numStr) / 100.0)

      const regexPat = /[+-]?[\d\,\.\s]/g
      const filtered = fmt.match(regexPat)?.join('') ?? ''

      console.log('format [numStr, fmt, filtered]', numStr, fmt, filtered)
      return filtered
    }

    // TODO Try refactor with the patter for MUI
    // https://codesandbox.io/p/sandbox/custominput-demo-u3wg9m?file=%2Fsrc%2FApp.js&from-embed=
    return (
      <NumberFormatBase
        // {...other}
        format={format}
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange(values)
        }}
      />
    )
  },
)
