import {
  Edit,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin'

import {
  CodeField,
  TimeAgoField,
  clickToCopy,
} from '@moonlight-labs/core-base-fe'

import Grid from '@mui/material/Grid'
import { ErrorPanelField } from '../../react-admin/fields/ErrorPanelField'

// const EditToolbar = (props: any) => (
//   <Toolbar {...props}>
//     <SaveButton />
//   </Toolbar>
// )

export const EditJob = (props: any) => {
  return (
      <Grid container>
        <Grid item xs={12} md={9}>
          <SimpleShowLayout>
            {/* <TextField source="jobClass" /> */}
            <TextField source="type" label="Job" />

            <TextField source="id" {...clickToCopy} />

            <TextField source="status" />
          </SimpleShowLayout>

          {/* // This needs it's own ShowLayout */}
          <ErrorPanelField />

          <SimpleShowLayout>
            <CodeField source="args" />
            <CodeField source="data" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={12} md={3}>
          <SimpleShowLayout>
            <TextField source="queue" />
            <TextField source="priority" />

            <TimeAgoField source="run_at" />
            <TimeAgoField source="finished_at" />
            <TimeAgoField source="expired_at" />
          </SimpleShowLayout>
        </Grid>
      </Grid>
  )
}
