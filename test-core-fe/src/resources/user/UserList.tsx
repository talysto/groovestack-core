import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { Avatar, Box } from '@mui/material'
import { Datagrid, List, NumberField, TextField } from 'react-admin'

const UserId = ({ record }: any) => {
  return (
    <Box sx={{display: 'flex', gap: 2}}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    <TextField
      source="name"
      record={record}
      label="User ID"
      style={{ fontWeight: 'bold' }}
    />
    </Box>
  )
}

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
    <UserId source="name" />
    <TimeAgoField source="last_login_at" />
    <TimeAgoField source="sign_in_count" />
    <NumberField source="identities_count"/>
      {/* <TextField source="name" /> */}
      {/* <TextField source="type" /> */}
      {/* <TimeAgoField source="created_at" label="Registered" /> */}
    </Datagrid>
  </List>
)
