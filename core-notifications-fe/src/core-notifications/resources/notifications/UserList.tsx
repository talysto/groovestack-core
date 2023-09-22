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
  List,
  SearchInput,
  SingleFieldList,
  UpdateButton,
  useRecordContext,
} from 'react-admin'

export const UserList = () => {
  const to = useRecordContext()

  return (
    <InfiniteList
      resource="Notification"
      sort={{ field: 'type', order: 'DESC' }}
      // TODO: Enable for production
      filter={{ 
        to_ids: [to.id],
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
    </InfiniteList>
  )
}

const NotificationItem = () => {
  const task = useRecordContext()

  // if (task.kind === 'Task')
  //   return (
  //     <Alert action={<ActionButtons />}>
  //       You have been invited as the <strong>President</strong> of{' '}
  //       <strong>XYZ PTA</strong>. Lorem ipsum this is a long text title that
  //       might go with the item.
  //     </Alert>
  //   )

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      // secondaryAction={<ActionButtons />}
    >
      {/* <ListItemButton> */}
      <ListItemAvatar>
        {task.type.includes('Task') ? <TaskAltOutlinedIcon color="warning" /> : (task.read_at ? <RadioButtonCheckedOutlinedIcon /> : <CircleOutlinedIcon />)}
      </ListItemAvatar>
      <ListItemText primary={task.title} secondary={task.description} />

      <ActionButtons />
      {/* </ListItemButton> */}
    </ListItem>
  )
}

const ActionButtons = () => {
  const task = useRecordContext()

  if (task.type.includes('Task'))
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ml:2}}>
        <UpdateButton
          startIcon={undefined}
          color="primary"
          variant="outlined"
          label="Accept"
          data={{}}
        />
        <UpdateButton
          startIcon={undefined}
          variant="outlined"
          label="Decline"
          data={{}}
        />
      </Box>
    )

  if (task.link) return <Button href={task.link.url}>{task.link.label || 'Read More...'}</Button>

  // return false

  return <UpdateButton startIcon={undefined} sx={{whiteSpace: 'nowrap'}} label="Mark as Read" data={{}} />
}

const userFilters = [<SearchInput key="q" source="q" alwaysOn />]
