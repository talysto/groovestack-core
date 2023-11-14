import {
  PasswordInput,
  SimpleForm,
  minLength,
  required,
  useGetIdentity,
  useRecordContext
} from 'react-admin'
import { useWatch } from 'react-hook-form'

export const SecuritySettings = () => {
  const password = useWatch({ name: 'password' })
  const currentPassword = useWatch({ name: 'current_password' })
  const { data: currentUser } = useGetIdentity()
  const record = useRecordContext()
  if (!(record && currentUser)) return null 

  const disabled = currentUser.id != record.id

  return (
    <SimpleForm disabled={disabled}>
      {record.has_email_provider ? <PasswordInput
        source="current_password"
        label="Current Password"
        fullWidth
        validate={password ? required() : undefined}
      /> : null }
      <PasswordInput
        source="password"
        fullWidth
        helperText="(6 characters minimum)"
        validate={[
          ...(currentPassword ? [required()] : []),
          minLength(6, 'Password is too short (minimum is 6 characters)'),
        ]}
      />
    </SimpleForm>
  )
}
