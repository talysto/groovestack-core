import {
  CodeField,
  TimeAgoField,
  clickToCopy,
} from '@moonlight-labs/core-base-fe'
import { Edit, SimpleForm, SimpleShowLayout, TextField } from 'react-admin'

import { ErrorPanelField } from '../../react-admin/fields/ErrorPanelField'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'

export const EditJob = (props: any) => {
  return (
      <SimpleForm>
        <SimpleShowLayout>
          {/* Meta: */}
          <TextField source="job_class" />
          <TextField source="sub_class" />
          <TextField source="id" noWrap {...clickToCopy} />
          <JobStatusField />
          <ErrorPanelField />
          {/* Job Info: */}
          <TextField source="queue" />
          <TextField source="priority" />
          <CodeField source="args" />
          <CodeField source="data" />
          {/* Timeline: */}
          <TimeAgoField source="run_at" />
          <TimeAgoField source="finished_at" />
          <TimeAgoField source="expired_at" />
        </SimpleShowLayout>
      </SimpleForm>
  )
}
