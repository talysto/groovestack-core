import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceManyCount,
  ReferenceManyField,
  SaveButton,
  SelectInput,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
} from 'react-admin'

import { Paper, Typography } from '@mui/material'
import { CoreComments } from 'core-comments-fe'
import { CoreVersions } from 'core-versions-fe'
import { CoreAccounting } from 'core-accounting-fe'

import { users } from '../../data/mock-data-provider'
import { faker } from '@faker-js/faker'
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'

const Comments = CoreComments.Comments
const Versions = CoreVersions.Versions
const Lines = CoreAccounting.Lines

const mockCommentDefaults = () => {
  return {
    id: uuidv4(),
    body: '',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  }
}

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
  return (
    <>
      <Paper sx={{ minWidth: 400, maxWidth: 600, p: 2, ml: 2 }}>
        <Typography variant="h6">Comments</Typography>
        <Comments.Stream createProps={{ authorResolver: () => (faker.helpers.arrayElement(users)), defaultValues: mockCommentDefaults }} />
        <Typography variant="h6">Transactions</Typography>
        <Lines.ReferenceManyLines tableProps={{ filters: lineFilters }} />
        <Typography variant="h6">Versions</Typography>
        <SimpleShowLayout>
          <Versions.Stream target="actor_id" />
        </SimpleShowLayout>
      </Paper>
    </>

  )
}

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
    <SimpleForm toolbar={<EditToolbar/>}>
      <TextInput  source="name" fullWidth />
    </SimpleForm>
  </Edit>
);

export class User {
  static List = UserList
  static Edit = UserEdit
}


const EditToolbar = () => {
  // const notify = useNotify();
  const formContext = useFormContext();
  // console.log("formContext EDIT = ", formContext)
  // const formState = useFormState();
  // console.log("formState = ", formState)

  // const refresh = useRefresh();
  return (
      <Toolbar>
          <SaveButton
              type="button"
              label="Comment"
              variant="text"
              mutationOptions={{
                  onSuccess: () => {
                      //formContext?.reset();
                      window.scrollTo(0, 0);
                      // notify("changes saved")
                      // refresh();
                      // notify('ra.notification.created', {
                      //     type: 'info',
                      //     messageArgs: { smart_count: 1 },
                      // });
                  },
              }}
          />
      </Toolbar>
  );
};