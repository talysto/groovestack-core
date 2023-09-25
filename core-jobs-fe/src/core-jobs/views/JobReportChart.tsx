import { Stack, Typography } from '@mui/material'
import { ListBase, useDataProvider } from 'react-admin'

const ReactAdminRealtime = await import('@react-admin/ra-realtime')

export const JobReportChart = ({
  title,
  filter,
  children,
}: {
  title: string
  filter: any
  children: any
}) => {

  const dataProvider = useDataProvider()
  // debugger

  // console.log('has subscribe', typeof dataProvider['subscribe'] === 'function')
  // const ListComponent =  (typeof dataProvider['subscribe'] === 'function') ? ReactAdminRealtime.ListLive : ListBase
  const ListComponent = ListBase

  return (
    <ListComponent
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
    </ListComponent>
  )
}
