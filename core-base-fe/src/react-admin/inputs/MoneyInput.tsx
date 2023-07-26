import { InputProps, useInput } from 'react-admin'

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
export const MoneyInput = (props: InputProps) => {
  const { source, label } = props
  const { id, field, fieldState } = useInput({ source })

  return (
    <label htmlFor={id}>
      {label}
      <input id={id} {...field} />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  )
}
