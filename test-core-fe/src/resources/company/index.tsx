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
  useRecordContext,
} from 'react-admin'

import { Paper, Typography } from '@mui/material'
import { CoreComments } from 'core-comments-fe'
import { CoreVersions } from 'core-versions-fe'
import { CoreAccounting } from 'core-accounting-fe'

import { users } from '../../data/mock-data-provider'
import {faker} from '@faker-js/faker'

const Comments = CoreComments.Comments
const Versions = CoreVersions.Versions 

const inlineLayout = {
  sx: { '& .RaLabeled-label': { display: 'inline-block', minWidth: 60 } },
}

export const CompanyAside = () => {
  const record = useRecordContext()
  
  return (
    <>
      <Paper sx={{ minWidth: 300, maxWidth: 500, p: 2, ml: 2 }}>
        <Typography variant="h6">Details</Typography>
        <SimpleShowLayout {...inlineLayout} sx={{ padding: 0, marginBottom: 5 }}>
          <TextField source="id" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
        </SimpleShowLayout>
        <Typography variant="h6">Comments</Typography>
        <SimpleShowLayout sx={{ padding: 0 }}>
          <Comments.Stream createProps={{authorResolver: () => (faker.helpers.arrayElement(users))}} />
        </SimpleShowLayout>
      </Paper>
      <Paper sx={{ minWidth: 400, maxWidth: 600, p: 2, ml: 2 }}>
        <Typography variant="h6">Versions</Typography>
        <SimpleShowLayout>
          <Versions.Stream />
        </SimpleShowLayout>
      </Paper>
    </>
  )
}

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
