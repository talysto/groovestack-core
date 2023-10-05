import NoticeIcon from '@mui/icons-material/MarkChatReadOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

import {
  Alert,
  Box,
  Button,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List as MuiList,
} from '@mui/material'
import {
  InfiniteList,
  SingleFieldList,
  UpdateButton,
  useDataProvider,
  useGetIdentity,
  useListContext,
  useRecordContext,
  useUpdate,
} from 'react-admin'
import { useSubscribeToRecordList } from '@react-admin/ra-realtime'

const NotificationSubscriber = () => {
  const dataProvider = useDataProvider();
  const { refetch, resource } = useListContext();

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecordList((event) => {
    console.log('NotificationSubscriber', event)

    switch (event.type) {
      case "created": {
        refetch();
        break;
      }
    }
  }, resource, { enabled });

  return null;
}

export const UserList = () => {
  const to = useRecordContext()

  return (
    <InfiniteList
      resource="Notification"
      sort={{ field: 'type', order: 'DESC' }}
      // TODO: Enable for production
      filter={{ 
        to_id: [to.id],
        read: false,
      }}
      perPage={10}
      exporter={false}
      actions={false}
      // filters={false}
      // filters={userFilters}
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
      // secondaryAction={<ActionButtons />}
    >
      {/* <ListItemButton> */}
      <ListItemAvatar>
        {notification.type.includes('Task') ? <TaskAltOutlinedIcon color="warning" /> : (notification.read_at ? <RadioButtonCheckedOutlinedIcon /> : <CircleOutlinedIcon />)}
      </ListItemAvatar>
      <ListItemText primary={notification.title} secondary={notification.description} />

      <ActionButtons />
      {/* </ListItemButton> */}
    </ListItem>
  )
}

const ActionButtons = () => {
  const notification = useRecordContext()
  const { data: currentUser } = useGetIdentity()
  const [update] = useUpdate()

  const markAsReadArgs = notification.type.includes('Global') ? { id: currentUser?.id} : null

  const markAsRead = () => {
    update(
      'Notification',
      {
        id: notification.id,
        data: {
          instance_method: 'mark_as_read!',
          instance_method_args: markAsReadArgs

        },
        previousData: notification,
      },
      // {
      //   onSuccess: () => {
      //     console.log('Marked as read')
      //   },
      //   onError: () => {
      //     console.log('Failed to mark as read')
      //   },
      // }
    )
  }

  if (notification.type.includes('Task'))
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ml:2}}>
        {
          notification.actions.map((action: {label: string; response: string }, i: number) => (
            <UpdateButton
              key={i}
              startIcon={undefined}
              color={i == 0 ? "primary" : "secondary"}
              variant="outlined"
              label={action.label}
              data={{ instance_method: 'mark_as_complete!', instance_method_ards: { action_response: action.response } }}
            />
          ))
        }
      </Box>
    )

  if (notification.link) return <Link onClick={markAsRead} href={notification.link.url}>{notification.link.label || 'Read More...'}</Link>

  return (
    <UpdateButton 
      startIcon={undefined} 
      sx={{whiteSpace: 'nowrap'}} 
      label="Mark as Read" 
      data={{ instance_method: 'mark_as_read!', instance_method_args: markAsReadArgs }} 
    />
  )
}

// const userFilters = [<SearchInput key="q" source="q" alwaysOn />]
