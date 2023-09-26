import {
  CodeField,
  TimeAgoField,
  clickToCopy,
} from '@moonlight-labs/core-base-fe'
import { SimpleShowLayout, TextField } from 'react-admin'

import { Box } from '@mui/material'
import { ErrorPanelField } from '../../react-admin/fields/ErrorPanelField'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'

export const EditJob = (props: any) => {
  return (
    <Box>
      <SimpleShowLayout>
        <TextField source="job_class" />
        <TextField source="sub_class" />
        <TextField source="id" noWrap {...clickToCopy} />
        <JobStatusField />
        <ErrorPanelField />
        <CodeField source="args" />
        <CodeField source="data" />
        <TextField source="queue" />
        <TextField source="priority" />
        <TimeAgoField source="run_at" />
        <TimeAgoField source="finished_at" />
        <TimeAgoField source="expired_at" />
      </SimpleShowLayout>
    </Box>
  )
}
