import { Paper } from '@mui/material'

import { JobsSummary } from '../views/JobsSummary'
import { RPMChart } from '../views/RPMChart'
import { Workers } from '../views/Workers'
import './pivot.css'

export const JobsAside = () => {
  // const dataProvider = useDataProvider()
  // const resource = useResourceContext()

  // const refreshJobStatsTable = () => {
  //   const resourcePath = resource.split('/')
  //   const namespacedResource =
  //     resourcePath.length > 1 ? `${resourcePath[0]}/JobReport` : 'JobReport'

  //   return dataProvider.getList(namespacedResource, {
  //     filter: { reportName: 'job_stats' },
  //     pagination: { page: 0, perPage: 10 },
  //     sort: { field: '', order: '' },
  //   })
  // }

  // const refreshWorkersTable = () => {
  //   const resourcePath = resource.split('/')
  //   const namespacedResource =
  //     resourcePath.length > 1 ? `${resourcePath[0]}/Locker` : 'Locker'

  //   return dataProvider.getList(namespacedResource, {
  //     filter: {},
  //     pagination: { page: 1, perPage: 100 },
  //     sort: { field: '', order: '' },
  //   })
  // }

  // const transformJobStatsData = ({ data }: { data: any }) => {
  //   return data[0].data
  // }

  return (
    <Paper
      sx={{
        minWidth: '33%',
        m: 2,
        p: 2
      }}
    >
      {/* <KPIs /> */}
      <RPMChart />
      <JobsSummary />
      <Workers />
    </Paper>
  )
}
