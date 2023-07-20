import { Datagrid, DateField, List, TextField } from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      {/* <TextField source="type" /> */}
      <DateField source="created_at" label="Registered" />
    </Datagrid>
  </List>
)
