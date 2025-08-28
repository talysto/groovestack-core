import { CodeField, clickToCopy } from '@groovestack/base'
import { Form, SimpleShowLayout, TextField } from 'react-admin'

import { Grid } from '@mui/material'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'
import { JobTimelineField } from '../../react-admin/fields/JobTimelineField'

export const EditJob = (_props: any) => {
  return (
    <Form>
      <Grid container>
        <Grid item xs={4}>
          <SimpleShowLayout>
            <JobStatusField source="status" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={4}>
          <SimpleShowLayout>
            <TextField source="queue" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={4}>
          <SimpleShowLayout>
            <TextField source="priority" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={12}>
          <SimpleShowLayout>
            <TextField source="job_class" />
            <TextField source="sub_class" />
            <TextField source="id" label="ID" noWrap {...clickToCopy} />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={12}>
          <SimpleShowLayout>
            <TextField source="error_count" />
            <TextField source="last_error_message" />
            <CodeField source="last_error_backtrace" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={12}>
          <SimpleShowLayout>
            <CodeField source="args" />
            <CodeField source="data" />
          </SimpleShowLayout>
        </Grid>

        <Grid item xs={12}>
          <SimpleShowLayout>
            {/* <TimeAgoField source="run_at" />
            <TimeAgoField source="finished_at" />
            <TimeAgoField source="expired_at" /> */}

            <JobTimelineField label="Timeline" />
          </SimpleShowLayout>
        </Grid>
      </Grid>
    </Form>
  )
}
