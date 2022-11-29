import {
  Edit,
  SaveButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { JsonField } from "react-admin-json-view";

import { TimeAgoField } from "./TimeAgoField";

const ErrorPanel: React.FC = () => {
  const record = useRecordContext()
  
  if (!record || !record.errorCount) return null 

  return (
    <>
      <TextField source="errorCount" />
      <TextField source="lastErrorMessage" />
      <TextField source="lastErrorBacktrace" />
    </>
  )
}

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
        <TextField source="jobClass" />
        <TextField source="type" />
        <TextField source="args" />

        <JsonField
          source="args"
          jsonString={false} // Set to true if the value is a string, default: false
          reactJsonOptions={{
            // Props passed to react-json-view
            name: null,
            collapsed: true,
            enableClipboard: false,
            displayDataTypes: false,
          }}
        />

        <JsonField
          source="data"
          jsonString={false} // Set to true if the value is a string, default: false
          reactJsonOptions={{
            // Props passed to react-json-view
            name: null,
            collapsed: true,
            enableClipboard: false,
            displayDataTypes: false,
          }}
        />

        <TextField source="queue" />
        <TextField source="priority" />
        <TextField source="status" />

        <TimeAgoField source="runAt" />
        <TimeAgoField source="finishedAt" />
        <TimeAgoField source="expiredAt" />

        <ErrorPanel />
      </SimpleShowLayout>
      {/* //   </SimpleForm> */}
    </Edit>
  );
};
