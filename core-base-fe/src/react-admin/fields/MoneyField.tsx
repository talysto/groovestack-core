import { FieldProps, useRecordContext } from 'react-admin'
import get from 'lodash/get'

/**
 * React Admin Field that supports editing a currency value.
 *
 * @component
 *
 * @example
 * return (
 *   <MoneyField source='price' />
 * )
 */
export const MoneyField = (props: MoneyFieldProps) => {
  const record = useRecordContext(props)
  const { source, ...rest } = props

  if (!record || !source) return null

  const sourceValue = get(record, source)

  return <div>{sourceValue}</div>
}

export interface MoneyFieldProps<
  RecordType extends Record<string, unknown> = Record<string, any>,
> extends FieldProps<RecordType> {
  // src?: string;
  //     title?: string;
  //     sx?: SxProps;
}

// = <
//     RecordType extends Record<string, unknown> = Record<string, any>
// >(
//     props: MoneyFieldProps<RecordType>
// ) =>

{
  /* <InputGroup size={bsSize}>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type="tel"
          inputMode="numeric"
          name={name}
          value={value}
          {...inputProps}
        />
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
      </InputGroup> */
}
