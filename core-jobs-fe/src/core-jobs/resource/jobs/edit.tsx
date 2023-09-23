import { Edit, Show, SimpleShowLayout, TextField } from 'react-admin'
import {
  CodeField,
  TimeAgoField,
  clickToCopy,
} from '@moonlight-labs/core-base-fe'

import { Box } from '@mui/material'
import { ErrorPanelField } from '../../react-admin/fields/ErrorPanelField'
// import { clickToCopy } from './clickToCopy'

// const EditToolbar = (props: any) => (
//   <Toolbar {...props}>
//     <SaveButton />
//   </Toolbar>
// )

export const EditJob = (props: any) => {
  return (
    <Box>
      
      <SimpleShowLayout>
        <TextField source="type" label="Job" />
        <TextField source="id" noWrap {...clickToCopy} />
        <TextField source="status" />
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
