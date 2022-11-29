import {
  Edit,
  Labeled,
  SaveButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { JsonField } from "react-admin-json-view";

import { TimeAgoField } from "./TimeAgoField";
import Grid from '@mui/material/Grid';

const ErrorPanel: React.FC = () => {
  const record = useRecordContext()
  
  if (!record || !record.errorCount) return null 

  return (
    <>
      <div>
        <Labeled label="Error Count">
          <TextField source="errorCount" />
        </Labeled>
      </div>
      <div>
        <Labeled label="Last Error Message">
          <TextField source="lastErrorMessage" />
        </Labeled>
      </div>
      <div>
        <Labeled label="Error Stacktrace">
          <TextField source="lastErrorBacktrace" />
        </Labeled>
      </div>
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
      <SimpleShowLayout>
        {/* <TextField source="jobClass" /> */}
        <TextField source="type" label='Job' />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div>
              <Labeled label="ID">
                <TextField source="id" />
              </Labeled>
            </div>
            <div>
              <Labeled label="Status">
                <TextField source="status" />
              </Labeled>
            </div>
            <div>
              <Labeled label="Queue">
                <TextField source="queue" />
              </Labeled>
            </div>
            <div>
              <Labeled label="Priority">
                <TextField source="priority" />
              </Labeled>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Labeled label="Run At">
                <TimeAgoField source="runAt" />
              </Labeled>
            </div>
            <div>
              <Labeled label="Finished At">
              <TimeAgoField source="finishedAt" />
              </Labeled>
            </div>
            <div>
              <Labeled label="Expired At">
                <TimeAgoField source="expiredAt" />
              </Labeled>
            </div>
          </Grid>
        </Grid>

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

        <ErrorPanel />
      </SimpleShowLayout>
    </Edit>
  );
};
