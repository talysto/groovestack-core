import { Box, Input } from '@mui/material'
import { useState } from 'react'
import { SocialSignInProps, standard } from '../../components/login-mui/SocialSignIn'
import { defaultCredentials } from '../../credentials'
import { StyledIcon } from '@styled-icons/styled-icon'
import { csrfToken } from '../../react-admin/LoginPage'
import { MoreIcons } from '../../components/MoreIcons'

const { Apple, Facebook, Google, Microsoft } = MoreIcons
const identityProviders: { [k: string]: StyledIcon } = {
  google: Google,
  apple: Apple,
  facebook: Facebook,
  microsoft: Microsoft,
}

type OauthProvider = {
  k: string
  path: string
}

const social = defaultCredentials.getAppConfig()?.oauth_providers?.enabled.map((p: OauthProvider) => {
  const { k, path: href } = p
  return { k, href }
})

const csrf = csrfToken()

const socialSignInRender: SocialSignInProps['renderButton'] = ({ key, icon, label, href, disabled }) => {
  return (
    <Box
      component='form'
      method='post'
      action={href}
    >
      <Input type='hidden' name='authenticity_token' value={csrf} />
      <Button disabled={disabled} type='submit' variant='outlined' startIcon={icon}>{label}</Button>
    </Box>
  )
}

import { Button, Menu, MenuItem, Fade } from '@mui/material'

export const ConnectSocialLogin = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!props.data) return <></>

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
          const disabled = props.data.find((record: any) => record.provider === k)

          const s = standard.find((s) => s.key == k)
          if (!s) return null

          const { key, icon, label } = s

          return (
            <MenuItem>
              <span key={key}>{socialSignInRender({ key, icon, label, href, disabled })}</ span>
            </MenuItem>    
          )
        })}
      </Menu>
    </div>
  );
}