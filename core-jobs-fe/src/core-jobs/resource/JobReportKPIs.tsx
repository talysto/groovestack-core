import { Stack } from '@mui/material'
import { WithListContext } from 'react-admin'
import { Metric } from '../components/Metric'
import { JobReportChart } from '../views/JobReportChart'

export const JobReportKPIs = () => {
  // const theme = useTheme();
  // const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <JobReportChart title={''} filter={{ id: 'jobs_kpis' }}>
      <WithListContext
        render={({ data }) => {
          if (!data) return <div>No data</div>

          const record = data[0].data[0]
          // console.debug('jobs_kpis', record)
          const errors = record.errored + record.failed
          const queued = record.queued
          // if (record.oldest_queued_at) {
          //   const oldestTokens = timeAgo(record.oldest_queued_at)?.split(/[ ,]+/);
          //   const oldestProps = {value: oldestTokens[0], unit: oldestTokens[1]}
          // }

          return (
            <Stack
              sx={{
                // display: 'flex',
                flexDirection: 'row',
                gap: 2,
                // flexBasis: 'auto',
                // ...(moreThanSmall ? { m: 2, px: 2 } : { mt: 2, mr: 2 }),
              }}
            >
              {queued && (
                // <Box sx={{ width: '100%' }}>
                <Metric value={queued} label="Queued" />
                // {/* </Box> */}
              )}

              {/* {oldest && (
                // <Box sx={{ width: '100%' }}>
                  <Metric {...oldestProps} label="Latency" />
                // </Box>
              )} */}

              {errors && (
                // <Box sx={{ width: '100%' }}>
                <Metric value={errors} label="Errors" />
                // </Box>
              )}
            </Stack>
          )
        }}
      />
    </JobReportChart>
  )
}
