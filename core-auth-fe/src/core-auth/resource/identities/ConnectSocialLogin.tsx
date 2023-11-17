import { Box, Input } from '@mui/material'
import { useState } from 'react'
import { SocialSignInProps, standard } from '../../components/login-mui/SocialSignIn'
import { defaultCredentials } from '../../credentials'
import { csrfToken } from '../../react-admin/LoginPage'

type OauthProvider = {
  k: string
  path: string
}

const social = defaultCredentials.getAppConfig()?.oauth_providers?.enabled.map((p: OauthProvider) => {
  const { k, path: href } = p
  return { k, href }
})

const csrf = csrfToken()

const socialSignInRender: SocialSignInProps['renderButton'] = ({ icon, label, href, disabled }) => {
  return (
    <Box
      component='form'
      method='post'
      action={href}
    >
      <Input type='hidden' name='authenticity_token' value={csrf} />
      <Button sx={{ width: '100%' }} disabled={disabled} type='submit' variant='outlined' startIcon={icon}>{label}</Button>
    </Box>
  )
}

import { Button, Menu, MenuItem, Fade } from '@mui/material'
import { RaRecord, useListContext } from 'react-admin'

export const ConnectSocialLogin = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { data } = useListContext()
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!data) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Connect
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {social.map(({ k, href }: { k: any, href: any }) => {
          const disabled = !!data.find((record: RaRecord) => record.provider === k)

          const s = standard.find((s) => s.key == k)
          if (!s) return null

          const { key, icon, label } = s

          return (
            <MenuItem key={key}>
              <span style={{ width: '100%' }}>{socialSignInRender({ key, icon, label, href: `${href}?return_to=${window.location.href}`, disabled })}</ span>
            </MenuItem>    
          )
        })}
      </Menu>
    </div>
  );
}