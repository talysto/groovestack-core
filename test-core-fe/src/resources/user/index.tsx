import {
    Datagrid,
    DateField,
    DateInput,
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
  import { CoreVersions } from 'core-versions-fe'
  import { CoreAccounting } from 'core-accounting-fe'
  
  // const Comments = CoreComments.Resource
  // const ReferenceManyLines = CoreAccounting.Resource.ReferenceManyLines
  
  const inlineLayout = {
    sx: { '& .RaLabeled-label': { display: 'inline-block', minWidth: 60 } },
  }
  
  export const CompanyAside = () => (
    <Paper sx={{ minWidth: 400, maxWidth: 600, p: 2, ml: 2 }}>
      <Typography variant="h6">Transactions</Typography>
      <CoreAccounting.ReferenceManyLines />
    </Paper>
  )

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="type" />
            <TextField source="id" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit aside={<CompanyAside />}>
        <SimpleForm>
            <TextInput disabled source="name" fullWidth />
            {/* <TextInput source="type" />
            <TextInput source="id" />
            <DateInput source="created_at" />
            <DateInput source="updated_at" /> */}
        </SimpleForm>
    </Edit>
);
  
  export class User {
    static List = UserList
    static Edit = UserEdit
  }
  