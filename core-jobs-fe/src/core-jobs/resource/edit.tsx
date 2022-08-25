import {
  Edit,
  SaveButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  Toolbar,
} from "react-admin";

export const EditJob = (props: any) => {
  const EditToolbar = (props: any) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );

  // const { record } = useShowController({ resource: 'sessions' })

  return (
    <Edit>
      {/* //   <SimpleForm toolbar={<EditToolbar />}> */}
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="type" />
        <TextField source="args" />

        <TextField source="queue" />
        <TextField source="priority" />
        <TextField source="status" />

        <TextField source="createdAt" />
        <TextField source="runAt" />
        <TextField source="errorAt" />
        <TextField source="completedAt" />

        <TextField source="errors" />
        <TextField source="lastError" />
      </SimpleShowLayout>
      {/* //   </SimpleForm> */}
    </Edit>
  );
};
