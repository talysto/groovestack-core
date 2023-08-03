import { Grid } from '@mui/material'
import {
  ChipField,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

import { CodeField } from '../CodeField'

// TODO: Convert to recordRepresentation
// const Title = () => {
//   const record = useRecordContext()
//   if (!record) return null
//   return (
//     <>
//       {capitalize(record.source)} / {record.event}
//     </>
//   )
// }

export const WebhookShow = () => (
  <Show>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SimpleShowLayout spacing={3}>
          <TextField source="id" label="ID" />
          <TextField source="source" />
          <TextField source="event" />
          <ChipField source="status" />
          <DateField source="created_at" showTime />
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={6}>
        <SimpleShowLayout>
          <CodeField source="data" />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
