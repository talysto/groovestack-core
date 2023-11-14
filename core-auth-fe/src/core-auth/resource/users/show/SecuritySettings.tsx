import {
  PasswordInput,
  SimpleForm,
  minLength,
  required,
  useGetIdentity
} from 'react-admin'
import { useWatch } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const SecuritySettings = () => {
  const password = useWatch({ name: 'password' })
  const currentPassword = useWatch({ name: 'current_password' })
  const { data: currentUser } = useGetIdentity()
  const { id } = useParams()
  const disabled = currentUser?.id != id

  return (
    <SimpleForm>
      { currentUser?.hasEmailProvider ? <PasswordInput
        disabled={disabled}
        source="current_password"
        label="Current Password"
        fullWidth
        validate={password ? required() : undefined}
      /> : null }
      <PasswordInput
        disabled={disabled}
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
