// import { Notifications } from "@mui/icons-material"
import { Badge, Menu, IconButton, Box, Typography } from "@mui/material"
import { useState } from "react"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Notifications } from "../resources/notifications"
import { RecordContextProvider, useGetIdentity } from "react-admin"

export const NotificationMenuButton = (props:any) => {
  const { data: user, isLoading: identityLoading } = useGetIdentity()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Badge
        badgeContent={4}
        color="error"
        overlap="circular"
        // style={{  transform: 'translate(30px, -20px)'}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
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
        <Box sx={{ m: 2 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notifications
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <RecordContextProvider value={ user }>
            <Notifications.List />
          </RecordContextProvider>
        </Box>
      </Menu>
    </>
  )
}
