import { Box, Button, TextField } from '@mui/material'

export interface LoginFormProps {
  ctaDisabled?: boolean
  onPasswordReset?: Function
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  // social?: string[]
  // onClickSocialConnect?: Function
  // onLoginClick?: Function
  // onRegisterClick?: Function
}

export const LoginForm = ({
  ctaDisabled,
  onPasswordReset,
  onSubmit,
}: LoginFormProps) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
  >
    <TextField label="Email" type="email" id="email" placeholder="email@domain.com" required />
    <TextField
      label="Password"
      id="password"
      placeholder="password"
      type="password"
      autoComplete="current-password"
      required
    />
    <div>
      <Button disabled={ctaDisabled} variant="contained" type="submit">
        Login
      </Button>
      {onPasswordReset && (
        <Button onClick={() => onPasswordReset()}>Recover Password</Button>
      )}
    </div>
  </Box>
)
