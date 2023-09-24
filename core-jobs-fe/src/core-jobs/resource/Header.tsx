import { Grid, Typography } from '@mui/material'
import { JobReportKPIs } from './JobReportKPIs'

export const Header = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4" sx={{}} title="Groovestack Jobs">
          <span style={{ fontWeight: 700 }}>GS</span>
          <span style={{ fontWeight: 200 }}>Jobs</span>
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <JobReportKPIs />
      </Grid>
    </Grid>
  )
}
