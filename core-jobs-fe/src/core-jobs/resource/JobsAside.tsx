import { Box, Paper, Stack, styled } from '@mui/material'

import { JobsSummary } from '../views/JobsSummary'
import { RPMChart } from '../views/RPMChart'
import { UtilizationChart } from '../views/UtilizationChart'
import { QueChart } from '../views/QueChart'
import { WorkersTable } from '../views/Workers'
import './pivot.css'
import { KPIs } from '../views/KPIs'
import { Metric } from '../Metric'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

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
      <Stack spacing={3}>
        <Item elevation={0}>
          <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between', width: '100%' }}
            >
              <Box sx={{ flexBasis: '100%' }}><Metric value="14" label="Queued" units="k" /></Box>
              <Box sx={{ flexBasis: '100%' }}><Metric value="32" label="Latency" units="min" /></Box>
              <Box sx={{ flexBasis: '100%' }}><Metric value="4" label="Errors" /></Box>
          </Stack>
        </Item>


        <Item sx={{height: 160}} elevation={0}>
          <RPMChart />
        </Item>

        <Item sx={{height: 200}} elevation={0}>
          <UtilizationChart />
        </Item>

        <Item elevation={0}>
          <JobsSummary />
        </Item>



      </Stack>

      {/* <QueChart /> */}
      {/* <WorkersTable /> */}
    </Paper>
  )
}
