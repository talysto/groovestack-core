import { Grid } from '@mui/material'
import {
  ChipField,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

export const NotificationShow = () => (
  <Show>
    <Grid container spacing={2}>
      <Grid item>
        <SimpleShowLayout spacing={3}>
          <TextField source="id" label="ID" />
          {/* <TextField source="source" />
          <TextField source="event" /> */}
          <ChipField source="status" />
          <DateField source="created_at" showTime />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
