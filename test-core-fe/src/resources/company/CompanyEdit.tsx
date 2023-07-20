import {
  DateField,
  Edit,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'
import { inlineLayout } from '../inlineLayout'
import { CompanyAside } from './CompanyAside'

export const CompanyEdit = () => (
  <Edit aside={<CompanyAside />}>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="address" fullWidth />
      <SimpleShowLayout {...inlineLayout} sx={{ padding: 0, marginBottom: 5 }}>
        <TextField source="id" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </SimpleShowLayout>
    </SimpleForm>
  </Edit>
)
