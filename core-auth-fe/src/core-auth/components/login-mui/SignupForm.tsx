import { Box, Button, TextField } from '@mui/material'

export interface SignupFormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const SignupForm = ({ onSubmit }: SignupFormProps) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
  >
    <TextField label="Full Name" id="fullname" placeholder="First Last" required />
    <TextField label="Email" type='email' id="email" placeholder="email@domain.com" required />
    <TextField
      label="Password"
      id="password"
      placeholder="password"
      type="password"
      autoComplete="current-password"
      required
    />
    <div>
      <Button variant="contained" type='submit'>Create Account</Button>
    </div>
  </Box>
)
