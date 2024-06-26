import { TimeAgoField } from '@groovestack/base'
import { Datagrid, List, TextField } from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      {/* <TextField source="type" /> */}
      <TimeAgoField source="created_at" label="Registered" />
    </Datagrid>
  </List>
)
