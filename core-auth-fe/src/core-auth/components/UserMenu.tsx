import * as React from 'react'

import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Divider } from '@mui/material'
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
import { AvatarLabel } from './AvatarLabel'

const UserMenuItem = React.forwardRef((props: any, ref) => {
  const { onClose } = useUserMenu()

  const { label, icon, path } = props

  return (
    <MenuItem
      ref={ref}
      component={Link}
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
    <RAUserMenu>
      <Box sx={{ p: 2 }}>
        <AvatarLabel
          title={currentUser?.name}
          image={currentUser?.avatar_image?.[0]?.[0]}
        ></AvatarLabel>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />

      {menuConfig.map((menu, idx) => (
        <UserMenuItem
          key={idx}
          label={menu.label}
          path={menu.path}
          icon={menu.icon}
        />
      ))}

      <Divider />
      <Logout />
    </RAUserMenu>
  )
}
