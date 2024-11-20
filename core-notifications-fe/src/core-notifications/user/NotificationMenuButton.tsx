// import { Notifications } from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import {
  Badge,
  Box,
  IconButton,
  Menu,
  Typography,
} from '@mui/material'
import { useState, createContext, useEffect, useContext } from 'react'
import { DataProviderContext, RecordContextProvider, useGetIdentity, useGetList } from 'react-admin'
import { ApolloProvider, gql, useSubscription } from '@apollo/client'

import { Notifications } from '../resources/notifications'

export const SUBSCRIBE_TO_NOTIFICATIONS = gql`
  subscription all_notifications {
    all_notifications {
      subscription
      subscription_args
      event
    }
  }
`

type NotificationEvent = 'created' | 'updated' | 'deleted' | 'subscribe' | 'unsubscribe' | null

export const NotificationSubscriberEventContext = createContext<NotificationEvent>(null)

const NotificationMenuButton = (props: any) => {
  const { data: user, isLoading: identityLoading } = useGetIdentity()
  const [event, setEvent] = useState<NotificationEvent>(null)

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

  const { data: subscriptionData } = useSubscription(SUBSCRIBE_TO_NOTIFICATIONS)

  useEffect(() => {
    if (subscriptionData?.all_notifications && subscriptionData.all_notifications.event.type != 'subscribe') setEvent(subscriptionData.all_notifications.event.type)
  }, [subscriptionData])

  useEffect(() => {
    switch (event) {
      case "created":
      case "updated": {
        refetchNotificationCount();
        break;
      }
    }
  }, [event])

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
          <NotificationSubscriberEventContext.Provider value={event}>
            <RecordContextProvider value={user}>
              <Notifications.UserList />
            </RecordContextProvider>
          </NotificationSubscriberEventContext.Provider>
        </Box>
      </Menu>
    </>
  )
}

const NotificationMenuButtonWithApolloProvider = (props: any) => {
  // don't want dataprovider wrapped in proxy 
  // https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/dataProvider/useDataProvider.ts
  const dataProvider = useContext(DataProviderContext)

  if (!dataProvider) return null
  return (
    <ApolloProvider client={dataProvider.client}>
      <NotificationMenuButton {...props} />
    </ApolloProvider>
  )
}

export { NotificationMenuButtonWithApolloProvider as NotificationMenuButton }
