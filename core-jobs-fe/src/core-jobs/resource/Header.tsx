import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

export const Header = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        {/* <Typography sx={{}} title="Groovestack Jobs">
          <span style={{ fontWeight: 700 }}>GROOVESTACK</span>
          <span> / </span>
          <span style={{ fontWeight: 200 }}>CORE Jobs</span>
        </Typography> */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            style={{ fontWeight: 700 }}
            target="ext"
            href="https://talysto.com/groovestack"
          >
            GROOVESTACK
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Jobs</Typography>
        </Breadcrumbs>
      </Grid>

      {/* <Grid item xs={12} sm={4}>
        <JobReportKPIsLive />
      </Grid> */}
    </Grid>
  )
}
