import { Grid } from '@mui/material'
import {
  ChipField,
  DateField,
  FunctionField,
  RaRecord,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
  WrapperField,
} from 'react-admin'

import { CodeField, ExternalLink, clickToCopy } from '@groovestack/base'
import { SourceField } from './SourceField'

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

const inlineLayout = {
  '& .RaLabeled-label': {
    display: 'inline-block',
    minWidth: 70,
    mr: 1,
    textTransform: 'uppercase',
  },
}

export const WebhookShow = ({ children, ...rest }: ShowProps) => (
  <Show {...rest}>
    <Grid container>
      <Grid item xs={12} md={6}>
        <SimpleShowLayout sx={{ ...inlineLayout }}>
          <TextField source="id" noWrap label={false} {...clickToCopy} />

          <SourceField source="source" />
          <WrapperField source='Event' label="Event">
            <TextField source="event" sx={{ mr: 2 }} />
            <FunctionField
              label={false}
              render={(record: RaRecord) => record && (
                <ExternalLink
                  hideIcon
                  title="search..."
                  url={`https://google.com/search?q=${record.source}+${record.event}+webhook`}
                />
              )}
            />
          </WrapperField>

          <ChipField source="status" size="small" />
          <DateField source="created_at" label="Created" showTime />
          {children}
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={12} md={6}>
        <SimpleShowLayout>
          <CodeField source="headers" label="HEADERS" />
          <CodeField source="data" label="DATA" />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
