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

      <Typography variant="h6">Avatar</Typography>
      {/* <AvatarUpload /> */}

      <TextInput source="name" fullWidth />
      {/* <GoogleAddressAutocompleteInput
        fieldProps={{
          required: isRequired,
          error: (isTouched || isSubmitted) && invalid,
          helperText: (
            <InputHelperText
              touched={isTouched || isSubmitted}
              error={error?.message} />
          ),
          label: 'Address'
        }}
        onSelectOption={(place: PlaceType) => {
          field.onChange(place?.description || null); // undefined is not acceptable prop for react-hook-form. pass null to clear address
        }}
        defaultValue={field.value} /> */}
      {/* <TextInput source="phone" fullWidth /> */}
      {/* <TextInput disabled source="language" fullWidth /> */}
      {/* <SelectInput source="timezone" choices={time_zones} fullWidth /> */}
      {/* <EmailSettings /> */}
      {/* <NotificationSettings /> */}
    </SimpleForm>
  )
}
