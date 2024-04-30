import { InputProps, TextInput } from 'react-admin'

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
