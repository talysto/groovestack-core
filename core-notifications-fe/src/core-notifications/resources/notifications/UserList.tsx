import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useContext, useEffect } from 'react';
import {
  Box,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List as MuiList,
} from '@mui/material'
import {
  Button,
  InfiniteList,
  SingleFieldList,
  useDataProvider,
  useGetIdentity,
  useListContext,
  useRecordContext,
  useUpdate,
} from 'react-admin'

import { NotificationSubscriberEventContext } from '../../user/NotificationMenuButton';

const NotificationSubscriber = () => {
  const { refetch } = useListContext();
  const event = useContext(NotificationSubscriberEventContext);

  useEffect(() => {
    switch (event) {
      case "created":
      case "updated": {
        refetch();
        break;
      }
    }
  }, [event])

  return null;
}

export const UserList = () => {
  const to = useRecordContext()

  if (!to) return null
  return (
    <InfiniteList
      resource="Notification"
      sort={{ field: 'type', order: 'DESC' }}
      filter={{ 
        to_id: [to.id],
        read: false,
      }}
      perPage={10}
      exporter={false}
      actions={false}
      disableSyncWithLocation
    >
      <SingleFieldList component={MuiList}>
        <NotificationItem />
      </SingleFieldList>
      <NotificationSubscriber />
    </InfiniteList>
  )
}

const NotificationItem = () => {
  const notification = useRecordContext()

  if (!notification) return null

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <ListItemAvatar>
        {notification.type.includes('Task') ? <TaskAltOutlinedIcon color="warning" /> : (notification.read_at ? <RadioButtonCheckedOutlinedIcon /> : <CircleOutlinedIcon />)}
      </ListItemAvatar>
      <ListItemText primary={notification.title} secondary={notification.description} />
      <ActionButtons />
    </ListItem>
  )
}

const ActionButtons = () => {
  const notification = useRecordContext()
  if (!notification) return null
  const { data: currentUser } = useGetIdentity()

  const [update] = useUpdate()


  const markAsRead = (e: any) => {
    e.preventDefault() // necessary to prevent redirects on update (default save behavior)

    update(
      'Notification',
      {
        id: notification.id,
        data: {
          instance_method: 'mark_as_read!',
          instance_method_args: notification.type.includes('Global') ? { id: currentUser?.id} : null

        },
        previousData: notification,
      }
    )
  }

  const markAsComplete = (e: any, action_response: string) => {
    e.preventDefault()

    update(
      'Notification',
      {
        id: notification.id,
        data: {
          instance_method: 'mark_as_complete!',
          instance_method_args: { action_response }
        },
        previousData: notification,
      }
    ) 
  }


  if (notification.type.includes('Task'))
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ml:2}}>
        {
          notification.actions.map((action: {label: string; response: string }, i: number) => (
            <Button
              key={i}
              startIcon={undefined}
              color={i == 0 ? "primary" : "secondary"}
              variant={i == 0 ? "contained": "outlined" }
              onClick={(e) => markAsComplete(e, action.response)}
              label={action.label}
            />
          ))
        }
      </Box>
    )

  if (notification.link) return <Link onClick={markAsRead} href={notification.link.url}>{notification.link.label || 'Read More...'}</Link>

  return <Button startIcon={undefined} sx={{whiteSpace: 'nowrap'}} onClick={markAsRead} label='Mark as Read' />
}