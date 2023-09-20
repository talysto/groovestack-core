import { ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'
import {
  List,
  SearchInput,
  SingleFieldList,
  UpdateButton,
  useRecordContext,
} from 'react-admin'

export const UserList = () => {
  const to = useRecordContext()

  // console.debug('to', to)
  return (
    <List
      resource="Notification"
      // TODO: Enable for production
      // filter={{ to_id: to.id }}
      perPage={10}
      exporter={false}
      // actions={false}
      // filters={userFilters}
    >
      <SingleFieldList>
        <TaskItem />
      </SingleFieldList>
    </List>
  )
}

const TaskItem = () => {
  const task = useRecordContext()

  return (
    <ListItem>
      <ListItemText primary={task.title} secondary={task.description} />
      <ListItemSecondaryAction>
        <ActionButtons />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const ActionButtons = () => {
  const task = useRecordContext()

  if (task.kind === 'Task')
    return (
      <>
        <UpdateButton variant="outlined" label="Accept" data={{}} />
        <UpdateButton variant="outlined" label="Decline" data={{}} />
      </>
    )

  return <UpdateButton label="Mark as Read" data={{}} />
}

const userFilters = [<SearchInput key="q" source="q" alwaysOn />]
