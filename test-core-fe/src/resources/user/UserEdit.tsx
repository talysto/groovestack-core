import {
  DateField,
  Edit,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'
import { inlineLayout } from '../inlineLayout'
import { UserAside } from './UserAside'

export const UserEdit = () => (
  <Edit aside={<UserAside />}>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <SimpleShowLayout {...inlineLayout} sx={{ padding: 0, marginBottom: 5 }}>
        <TextField source="id" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </SimpleShowLayout>
    </SimpleForm>
  </Edit>
)
