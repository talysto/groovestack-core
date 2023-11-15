import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Input, List, Button, ListItemButton, ListItemText, Collapse, Chip, Icon } from '@mui/material'
import { useState } from 'react'
import { SocialSignInProps, standard } from '../../components/login-mui/SocialSignIn'
import { defaultCredentials } from '../../credentials'
import { StyledIcon } from '@styled-icons/styled-icon'
import { csrfToken } from '../../react-admin/LoginPage'
import { MoreIcons } from '../../components/MoreIcons'
import { titleCase } from './table'

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

const socialSignInRender: SocialSignInProps['renderButton'] = ({ key, icon, label, href}) => {
  return (
    <Box
      component="form"
      method='post'
      action={href}
    >
      <Input type='hidden' name='authenticity_token' value={csrf} />
      <Button type='submit' startIcon={icon}>{label}</Button>
    </Box>
  )
}

export const ConnectSocialLogin = (props: any) => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  if (!props.data) return <></>

  return (
    <>
      <List
        disablePadding
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Connect" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {social.map(({ k, href }: { k: any, href: any }) => {
              const hasProvider = props.data.find((record: any) => record.provider === k)
              
              if (hasProvider) return <></>

              const s = standard.find((s) => s.key == k)
              if (!s) return null

              const { key } = s
              
              const Icon = identityProviders[k]

              const label = `Connect`
              const icon = <></>

              return (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',
                  flexDirection: 'row', flexWrap: 'nowrap', alignContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                    <div>
                  <Chip
                      onClick={undefined}
                      sx={{ backgroundColor: 'transparent', color: 'inherit' }}
                      icon={
                        <Box sx={{ pb: '.25em' }}>
                          <Icon size={'1em'} />
                        </Box>
                      }
                      label={<Box>{titleCase(k)}</Box>}
                    />
                    </div>
                    
                    <div style={{ width: '50%' }}>
                      <span key={key}>{socialSignInRender({ key, icon, label, href })}</ span>
                  </div>
                </div>
              )
            })}
          </List>
        </Collapse>
      </List>
    </>
  )
}