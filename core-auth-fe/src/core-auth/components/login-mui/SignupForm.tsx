import { Box, Button, TextField } from '@mui/material'

export const SignupForm = () => (
  <Box
    component="form"
    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
  >
    <TextField id="fullname" placeholder="First Last" />
    <TextField id="email" placeholder="email@domain.com" />
    <TextField
      id="password"
      placeholder="password"
      type="password"
      autoComplete="current-password"
    />
    <Button variant="contained">Create Account</Button>
  </Box>
)
