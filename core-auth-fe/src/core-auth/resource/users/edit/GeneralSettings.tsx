import { Typography } from '@mui/material'
import { SimpleForm, TextInput, useInput } from 'react-admin'

export const GeneralSettings = () => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput({ source: 'address' })

  return (
    <SimpleForm>
      <Typography variant="subtitle1">General</Typography>

      <TextInput source="name" fullWidth />
    </SimpleForm>
  )
}
