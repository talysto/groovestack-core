import { RaRecord, TextInputProps } from 'react-admin'

/**
 * MoneyInputProps are the props for the MoneyInput component.
 */

export interface MoneyInputProps extends TextInputProps {
  /** attribute of the record that contains the currency code
   * (similar to `source` for a standard Field or Input)
   * OR
   * the currency code itself (e.g. 'USD')
   * */
  currencySource: string

  //** Specific locale to use for rendering */
  // TODO: Attempt to type this correctly
  locales?: any // readonly string[] | string

  record?: RaRecord
}
