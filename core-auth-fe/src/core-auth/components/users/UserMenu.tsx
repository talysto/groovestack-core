import * as React from 'react'

import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Divider, ListSubheader } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import {
  Logout,
  UserMenu as RAUserMenu,
  useCreatePath,
  useGetIdentity,
  useUserMenu,
} from 'react-admin'
import { Link } from 'react-router-dom'
// import { Memberships } from '../resources/memberships'
// import { Payments } from '../resources/payments'
import { AvatarLabel } from '../shared/AvatarLabel'

// const { data, isLoading, error } = useGetIdentity();

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const UserMenuItem = React.forwardRef((props, ref) => {
  const { onClose } = useUserMenu()

  const { label, icon, path } = props

  return (
    <MenuItem
      ref={ref}
      component={Link}
      // It's important to pass the props to allow Material UI to manage the keyboard navigation
      {...props}
      to={path}
      onClick={onClose}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  )
})

export const UserMenu = () => {
  const createPath = useCreatePath()

  const {
    data: currentUser,
    isLoading: loadingMe,
    error: errorMe,
  } = useGetIdentity()

  if (loadingMe) return null

  const menuConfig = [
    {
      label: 'My Memberships',
      path: `${createPath({
        resource: 'User',
        type: 'show',
        id: currentUser?.id,
      })}`,
      icon: <Memberships.Icon fontSize="small" />,
    },
    {
      label: 'Payments',
      path: `${createPath({
        resource: 'User',
        type: 'show',
        id: currentUser?.id,
      })}/payments`,
      icon: <Payments.Icon fontSize="small" />,
    },
    {
      label: 'Preferences',
      path: `${createPath({
        resource: 'User',
        type: 'show',
        id: currentUser?.id,
      })}/preferences`,
      icon: <SettingsIcon fontSize="small" />,
    },
  ]

  return (
    // <RAUserMenu sx={{color:"inherit"}} label="First" icon={<ExpandMoreIcon fontSize="small" />}>
    <RAUserMenu>
      <Box sx={{ p: 2 }}>
        <AvatarLabel
          title={currentUser?.name}
          image={currentUser?.avatar_image?.[0]?.[0]}
        ></AvatarLabel>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />

      {/* <ListSubheader>USER</ListSubheader> */}

      {menuConfig.map((menu, idx) => (
        <UserMenuItem
          key={idx}
          label={menu.label}
          path={menu.path}
          icon={menu.icon}
        />
      ))}

      {currentUser?.leaderships && (
        <div>
          <Divider />
          <ListSubheader>ASSOCIATIONS</ListSubheader>
          {currentUser?.leaderships?.map((leadership, idx) => (
            <UserMenuItem
              key={idx}
              label={leadership.org_unit.common_name_or_name}
              path={createPath({
                resource: 'OrgUnit',
                type: 'show',
                id: leadership.org_unit.id,
              })}
              icon={<SettingsIcon fontSize="small" />}
            />
          ))}
        </div>
      )}

      <Divider />
      <Logout />
    </RAUserMenu>
  )
}
