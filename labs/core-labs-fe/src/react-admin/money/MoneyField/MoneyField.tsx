import { SxProps } from '@mui/material'
import _ from 'lodash'
import { NumberField, NumberFieldProps, useRecordContext } from 'react-admin'

export class MoneyFieldTransforms {
  static transformFromCents = (v: number) => Math.floor(v / 100)
}

interface MoneyFieldProps extends NumberFieldProps {
  /** attribute of the record that contains the currency code
   * (similar to `source` for a standard Field or Input)
   * OR
   * the currency code itself (e.g. 'USD')
   * */
  currencySource: string

  /** shorten to whole value (ie Dollars) */
  truncate?: boolean

  /** Show a special value when zero (0) */
  displayWhenZero?: string
}

// TODD: Rudimentary crypto support for more significant digits, etc
// const currencySpecificConfigs = {
//   BTC: {
//     minimumFractionDigits: 4,
//   },
//   ETH: {
//     minimumFractionDigits: 4,
//   },
// }

/**
 * MoneyField is a React Admin field that formats a number as currency.
 *
 * FEATURES
 * - Standard React Admin Field property interface
 * - Amount may be numerice or string value
 * - Currency specified by record or explicity via 'currencySource' prop
 * - Locale can be specified for currency formatting. Defaults to browser locale.
 * - Display a special value for zero amounts
 *
 * TODO
 * - Specify sx overrides for negative values, ie red text or () instead of - negative sign
 * - Crypto: Dynamic support if library found, Map unicode symbols for crypto and override, Allow specifying number of decimal places
 * - Support amount specific as Cents. Consider 'transform' usage for NumberField.
 *
 *
 * NOTES
 * - Stripe API specifies amounts in cents for USD. This is a common pattern for financial APIs.
 * Their docs include references to zero-decimal currencies like JPY, and three-decimal
 * currencies like BHD. https://docs.stripe.com/currencies#zero-decimal
 */
export const MoneyField = ({
  currencySource,
  truncate = false,
  displayWhenZero = undefined,
  ...rest
}: MoneyFieldProps & { sx?: SxProps }) => {
  const record = useRecordContext() || rest.record

  const currencyValue =
    (currencySource && _.get(record, currencySource)) || currencySource

  if (!Intl.supportedValuesOf('currency').includes(currencyValue)) {
    const err = `Currency '${currencyValue}' for ${currencySource} not supported.  Specify the source for the currency, ie 'price' or 'price.amount' OR an explicit ISO 4217 currency code, ie USD, JPY`
    console.error(err)
  }

  const overrides = {
    ...(truncate ? { maximumFractionDigits: 0 } : {}),
    // Pattern: ...query.bar && { bar: query.bar },
  }

  const options = {
    // ...(currencySpecificConfigs[currencyValue] || {}),
    ...overrides,
    style: 'currency',
    currency: currencyValue,
  }

  if (displayWhenZero) {
    const value = record && rest.source && _.get(record, rest.source)
    const numericValue = parseFloat(value)
    if (numericValue == 0)
      return (
        <NumberField
          options={options}
          {...rest}
          source="never-use-empty"
          emptyText={displayWhenZero}
        />
      )
  }

  return <NumberField options={options} {...rest} />
}
