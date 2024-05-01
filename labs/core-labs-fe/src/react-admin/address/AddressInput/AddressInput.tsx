import { InputProps, TextInput } from 'react-admin'

/**
 * AddressInput is a React Admin input that accepts free-form postal addresses as input
 * It can be used to validate values, reformat them and supports autocomplete
 * using the Google Places API (if enabled)
 */
export const AddressInput = (props: InputProps) => {
  return (
    <TextInput
      fullWidth
      multiline
      minRows={2}
      // sx={{ '& .MuiInputBase-input': { minHeight: '3em' } }}
      {...props}
    />
  )
}
