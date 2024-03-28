import { Box, Paper, Tab } from '@mui/material'
import { useState } from 'react'

// User lab version for W3G / aria support
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { SocialSignIn, SocialSignInProps, SocialSignInMode } from './SocialSignIn'

interface Props {
  ctaDisabled?: boolean
  onLogin?: React.FormEventHandler<HTMLFormElement> | undefined
  onRegister?: React.FormEventHandler<HTMLFormElement> | undefined
  providers?: string[]
  social?: SocialSignInProps['social']
  socialSignInRender?: SocialSignInProps['renderButton']
  onClickSocialConnect?: Function
  onPasswordReset?: Function
  onLoginClick?: Function
  onRegisterClick?: Function
  registration?: boolean
  login?: boolean
}

/**
 * Primary UI component for user interaction
 */
export function LoginPanel({
  onLogin,
  onRegister,
  onPasswordReset,
  providers,
  social,
  socialSignInRender,
  ctaDisabled = false,
  registration = true,
  login = true
}: Props) {
  const [value, setValue] = !login ? useState('2') : useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const emailProviderEnabled = providers?.includes('email')

  return (
    <Paper sx={{ margin: { xs: 0 }, minHeight: 425, display: 'flex', flexDirection: 'column' }}>
      {emailProviderEnabled && (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList centered onChange={handleChange} aria-label="Login or Signup">
              <Tab label="Login" value="1" disabled={!login} />
              {registration && <Tab label="Sign Up" value="2" />}
            </TabList>
          </Box>
            <TabPanel value="1">
              <LoginForm
                ctaDisabled={ctaDisabled}
                onSubmit={onLogin}
                onPasswordReset={onPasswordReset}
              />
            </TabPanel>
          {registration && (
            <TabPanel value="2">
              <SignupForm onSubmit={onRegister} />
            </TabPanel>
          )}
        </TabContext>
      )}
      <SocialSignIn mode={emailProviderEnabled ? SocialSignInMode.Footer : SocialSignInMode.Main} renderButton={socialSignInRender} social={social} />
    </Paper>
  )
}
