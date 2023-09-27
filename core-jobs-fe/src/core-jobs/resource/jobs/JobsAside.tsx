import { Box, Paper, Stack, styled } from '@mui/material'

import { RPMChart } from '../../views/RPMChart'
import { UtilizationChart } from '../../views/UtilizationChart'
import { JobReportKPIsLive } from '../JobReportKPIs'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const JobsAside = () => {
  return (
    <Box
      // item
      // elevation={0}
      // xs={12}
      // sm={4}
      sx={{
        pl: { xs: 0, sm: 3 },
        // width: '360px',
        // minWidth: '33%',
        // flexShrink: 0,
        // minWidth: '250px',
        // ml: 2,
        // mt: 2,
        // pr: 2,
        // pl: 2,
      }}
    >
      <Stack spacing={3}>
        <JobReportKPIsLive />

        <Item sx={{ height: 160 }} elevation={0}>
          <RPMChart />
        </Item>
        <Item sx={{ height: 200 }} elevation={0}>
          <UtilizationChart />
        </Item>
      </Stack>
    </Box>
  )
}
