import { Paper, Stack, styled } from '@mui/material'

import { RPMChart } from '../../views/RPMChart'
import { UtilizationChart } from '../../views/UtilizationChart'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const JobsAside = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: '33%',
        ml: 2,
        mt: 2,
        pr: 2,
        pl: 2,
      }}
    >
      <Stack spacing={3}>
        <Item sx={{ height: 160 }} elevation={0}>
          <RPMChart />
        </Item>
        <Item sx={{ height: 200 }} elevation={0}>
          <UtilizationChart />
        </Item>
      </Stack>
    </Paper>
  )
}
