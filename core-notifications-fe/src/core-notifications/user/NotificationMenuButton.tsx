// import { Notifications } from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import {
  Alert,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { RecordContextProvider, useDataProvider, useGetIdentity, useGetList } from 'react-admin'
import { useSubscribeToRecordList } from '@react-admin/ra-realtime'

import { Notifications } from '../resources/notifications'

export const NotificationMenuButton = (props: any) => {
  const { data: user, isLoading: identityLoading } = useGetIdentity()

  const dataProvider = useDataProvider()
  const resource = 'Notification'

  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { total, refetch: refetchNotificationCount } = useGetList(
    resource,
    {
      pagination: { page: 1, perPage: 0 },
      filter: { to_id: [user?.id], read: false },
    },
    { enabled: !identityLoading }
  )

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecordList((event) => {
    switch (event.type) {
      case "created": {
        refetchNotificationCount();
        break;
      }
    }
  }, resource, { enabled });

  if (!user) return null

  return (
    <>
      <Badge
        badgeContent={total}
        color="error"
        overlap="circular"
        // style={{  transform: 'translate(30px, -20px)'}}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'right',
        // }}
      >
        <IconButton onClick={handleClick} color="inherit" {...props}>
          <NotificationsNoneIcon />
        </IconButton>
      </Badge>
      <Menu
        id="basic-menu"
        sx={{ mt: 3 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ m: 2, width: 600 }}>
          <Typography id="modal-notification-title" variant="h6" component="h2">
            Notifications
          </Typography>
          <RecordContextProvider value={user}>
            <Notifications.UserList />
          </RecordContextProvider>
        </Box>
      </Menu>
    </>
  )
}
