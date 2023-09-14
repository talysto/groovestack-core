import {
  Edit,
  FieldProps,
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

const ErrorPanel = (props: FieldProps) => {
  const record = useRecordContext()

  if (!record || !record.error_count) return null

  return (
    <SimpleShowLayout>
      <TextField source="error_count" />
      <TextField source="last_error_message" />
      <CodeField source="last_error_backtrace" />
    </SimpleShowLayout>
  )
}

// const EditToolbar = (props: any) => (
//   <Toolbar {...props}>
//     <SaveButton />
//   </Toolbar>
// )

export const EditJob = (props: any) => {
  return (
    <Edit>
      <Grid container>
        <Grid item xs={12} md={9}>
          <SimpleShowLayout>
            {/* <TextField source="jobClass" /> */}
            <TextField source="type" label="Job" />

            <TextField source="id" {...clickToCopy} />

            <TextField source="status" />
          </SimpleShowLayout>

          {/* // This needs it's own ShowLayout */}
          <ErrorPanel />

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
    </Edit>
  )
}
