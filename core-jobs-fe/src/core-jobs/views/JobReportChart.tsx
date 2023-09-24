import { Stack, Typography } from '@mui/material'
import { ListBase } from 'react-admin'

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
    <ListBase
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
    </ListBase>
  )
}
