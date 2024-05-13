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
 * - Handle 2 and 3 digit currencies with the various source and format options
 * - Refactor to simpler MUI pattern
 * - Throw error if sourceFormat is 'cents' and allowMinorUnits is false and value has cents. This would likely cause the result to truncate the fractional part
 * - Handle whole values on mode
 * - Validate cents transforms mode
 * - Support Negative values
 */
export const MoneyInput = ({
  currencySource,
  sourceFormat = 'majorUnit',
  allowMinorUnits = false,
  record: recordProp,
  ...rest
}: MoneyInputProps) => {
  const [values, setValues] = useState<NumberFormatValues>()

  const data = useRecordContext()
  // const [value, setValue] = useState<string>()

  const record = recordProp || data

  if (!record) return

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

  const fractionDigits = // sourceFormat === 'cents' &&
    Intl.NumberFormat(rest.locales, {
      style: 'currency',
      currency: currencyValue,
    })
      .formatToParts(1)
      .find((part) => part.type === 'fraction')?.value.length

  const initialValue = (() => {
    // TODO detect truncation here
    if (sourceFormat == 'cents' && !allowMinorUnits) return numericValue / 100.0
    if (sourceFormat == 'majorUnit' && allowMinorUnits)
      return numericValue * 100.0
    return numericValue
  })()

  const FormatComponent = (() => {
    if (fractionDigits == 2 && allowMinorUnits) return NumericFormatCustom2
    if (fractionDigits == 3 && allowMinorUnits) return NumericFormatCustom3
    return NumericFormatCustom
  })()

  return (
    <TextInput
      InputProps={{
        // label="react-number-format-2"
        type: 'tel',
        value: values?.value || initialValue,
        onChange: handleChange,
        startAdornment: (
          <InputAdornment position="start">{prefix}</InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
        inputComponent: FormatComponent as any,
      }}
      helperText={JSON.stringify({
        record,
        init: initialValue,
        current: values,
      })}
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
        // NOTE: These options are important for 2, 3 digit currencies
        maximumFractionDigits: 0,
      }).format(parseFloat(numStr))

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

const NumericFormatCustom2 = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    const format = (numStr: string) => {
      if (numStr === '') return ''
      const fmt = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // NOTE: These options are important for 2, 3 digit currencies
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

const NumericFormatCustom3 = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    const format = (numStr: string) => {
      if (numStr === '') return ''
      const fmt = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // NOTE: These options are important for 2, 3 digit currencies
        maximumFractionDigits: 3,
      }).format(parseFloat(numStr)) /// 100.0)

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
