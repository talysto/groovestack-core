import {
    Datagrid,
    DateField,
    DateInput,
    Edit,
    List,
    ReferenceManyCount,
    ReferenceManyField,
    SelectInput,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
  } from 'react-admin'
  
  import { Paper, Typography } from '@mui/material'
  import { CoreComments } from 'core-comments-fe'
  import { CoreVersions } from 'core-versions-fe'
  import { CoreAccounting } from 'core-accounting-fe'
  
  export const UserAside = () => {
    const lineFilters = [
      <SelectInput
        alwaysOn
        source="code"
        choices={[
          { id: 'buy_aqd', name: 'Buy AQD' },
          { id: 'spend_aqd', name: 'Spend AQD' },
        ]}
      />
    ];
    return(
    <>
    <Paper sx={{ minWidth: 400, maxWidth: 600, p: 2, ml: 2 }}>
    <Typography variant="h6">Comments</Typography>
      <CoreComments.Comments.Stream />
      <Typography variant="h6">Transactions</Typography>
      <CoreAccounting.Lines.ReferenceManyLines tableProps={{filters: lineFilters}} />
      <Typography variant="h6">Versions</Typography>
      <SimpleShowLayout>
      <CoreVersions.Versions.Stream target="actor_id"/>
      </SimpleShowLayout>
    </Paper>
    </>
  
  )}

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
    <Edit aside={<UserAside />}>
        <SimpleForm>
            <TextInput disabled source="name" fullWidth />
        </SimpleForm>
    </Edit>
);
  
  export class User {
    static List = UserList
    static Edit = UserEdit
  }
  