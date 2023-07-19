import {
  Datagrid,
  DateField,
  List,
  ReferenceManyCount,
  TextField,
} from 'react-admin'

export const CompanyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" sx={{ fontWeight: 'bold' }} />
      <TextField source="address" />
      <ReferenceManyCount
        label="Comments"
        reference="Comment"
        target="resource_id"
      />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
)
