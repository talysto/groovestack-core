import { Box, Stack } from '@mui/material'

import { RPMChart } from '../../views/RPMChart'
import { UtilizationChart } from '../../views/UtilizationChart'
import { JobReportKPIsLive } from '../JobReportKPIs'

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(0),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

export const JobsAside = () => {
  return (
    <Box
      sx={{
        pl: { xs: 0, sm: 5 },
      }}
    >
      <Stack spacing={3}>
        <RPMChart />
        <UtilizationChart />
        <JobReportKPIsLive />
      </Stack>
    </Box>
  )
}
