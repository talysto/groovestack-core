import { InputAdornment } from '@mui/material'
import { InputProps, TextInput } from 'react-admin'

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

  // const ATM_REGEX = /^[0-9\.\,\b]+$/;

  return (
    <TextInput
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {/* {org?.currency?.symbol} */}$
          </InputAdornment>
        ),
        // onInput: (ev) => {
        //   const el = ev.target as HTMLInputElement | null
        //   if (!el || !el.value) return

        //   // console.log('before <' + el.value + '>')
        //   // const regexPat = /^[\d\.\,]+$/g
        //   // https://stackoverflow.com/questions/354044/what-is-the-best-u-s-currency-regex
        //   // cents required
        //   const regexPat = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/g

        //   el.value = el.value.match(regexPat)?.join('') ?? ''
        // },
        // onKeyDown: (event) => {
        //   if (!ATM_REGEX.test(event.key)) {
        //     event.preventDefault();
        //   }
        // }
      }}
      {...props}
    />
  )
}