import {
  Datagrid,
  DateField,
  Edit,
  List,
  ReferenceManyCount,
  ReferenceManyField,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

import { Paper, Typography } from '@mui/material'
import { CoreComments } from 'core-comments-fe'
const Comments = CoreComments.Resource

const inlineLayout = {
  sx: { '& .RaLabeled-label': { display: 'inline-block', minWidth: 60 } },
}

export const CompanyAside = () => (
  <Paper sx={{ minWidth: 400, maxWidth: 600, p: 2, ml: 2 }}>
    <Typography variant="h6">Details</Typography>
    <SimpleShowLayout {...inlineLayout}>
      <TextField source="id" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </SimpleShowLayout>

    <Typography variant="h6">Comments</Typography>
    <SimpleShowLayout>
      <CoreComments.CommentStream label={false} />
    </SimpleShowLayout>
  </Paper>
)

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

export const CompanyEdit = () => (
  <Edit aside={<CompanyAside />}>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="address" fullWidth />
    </SimpleForm>
  </Edit>
)

export class Company {
  static List = CompanyList
  static Edit = CompanyEdit
}
