import { InputProps, TextInput } from 'react-admin'

/**
 * AddressInput is a React Admin input that accepts free-form postal addresses as input
 * It can be used to validate values, reformat them and supports autocomplete
 * using the Google Places API (if enabled)
 */
export const AddressInput = (props: AddressInputProps) => {
  const {} = props
  return (
    <TextInput
      multiline
      minRows={2}
      sx={{ minWidth: '25em' }}
      // sx={{ '& .MuiInputBase-input': { minHeight: '3em' } }}
      {...props}
    />
  )
}

interface AddressInputProps extends InputProps {}
