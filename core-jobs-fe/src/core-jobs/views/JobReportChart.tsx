import { Stack, Typography } from '@mui/material'
import { ListBase } from 'react-admin'
import { ListLive } from '@react-admin/ra-realtime'

export const JobReportChart = ({
  title,
  filter,
  children,
}: {
  title: string
  filter: any
  children: any
}) => {
  return (
    <ListLive
    // <ListBase
      resource="JobReport"
      filter={filter}
      exporter={false}
      disableSyncWithLocation
      perPage={100}
    >
      <Stack sx={{ textAlign: 'left' }}>
        {title && <Typography variant="h6">{title}</Typography>}
        {children}
      </Stack>
    </ListLive>
  )
}
