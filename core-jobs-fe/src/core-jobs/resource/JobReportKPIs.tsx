import { Stack } from '@mui/material'
import {
  FunctionField,
  RaRecord,
  SimpleShowLayout,
  WithListContext,
} from 'react-admin'
import { Metric } from '../components/Metric'
import { JobReportChart, JobReportShow } from '../views/JobReportChart'

// export const JobReportKPIs = () => {
//   // const theme = useTheme();
//   // const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

//   return (
//     <JobReportChart title={''} filter={{ id: 'jobs_kpis' }}>
//       <WithListContext
//         render={({ data }) => {
//           if (!data) return <div>No data</div>

//           const record = data[0].data[0]
//           const errors = record.errored + record.failed
//           const queued = record.queued

//           // if (record.oldest_queued_at) {
//           //   const oldestTokens = timeAgo(record.oldest_queued_at)?.split(/[ ,]+/);
//           //   const oldestProps = {value: oldestTokens[0], unit: oldestTokens[1]}
//           // }

//           return (
//             <Stack
//               sx={{
//                 flexDirection: 'row',
//                 gap: 2,
//               }}
//             >
//               {queued && <Metric value={queued} label="Queued" key="queue" />}

//               {/* {oldest && (
//                 // <Box sx={{ width: '100%' }}>
//                   <Metric {...oldestProps} label="Latency" />
//                 // </Box>
//               )} */}

//               {errors && <Metric value={errors} label="Errors" key="errored" />}
//             </Stack>
//           )
//         }}
//       />
//     </JobReportChart>
//   )
// }

export const JobReportKPIsLive = () => {
  // const theme = useTheme();
  // const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <JobReportShow id="jobs_kpis">
      <SimpleShowLayout>
        <FunctionField
          render={(data: RaRecord) => {
            if (!data) return <div>No data</div>

            console.debug('JobReportKPIsLive:data', data)

            const record = data.data[0]
            console.debug('record', record)

            const errors = record.errored + record.failed
            const queued = record.queued

            return (
              <Stack sx={{ flexDirection: 'row', gap: 2 }}>
                {queued && (
                  <Metric value={queued} label="Queued" key="queued" />
                )}
                {errors && (
                  <Metric value={errors} label="Errors" key="errors" />
                )}
              </Stack>
            )
          }}
        />
      </SimpleShowLayout>
    </JobReportShow>
  )
}
