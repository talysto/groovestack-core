import { Stack } from '@mui/material'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { Metric } from '../components/Metric'
import { JobReportShow } from '../views/JobReportShow'

export const JobReportKPIsLive = () => {
  return (
    <JobReportShow id="jobs_kpis">
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(data: RaRecord) => {
            if (!data) return <div>No data</div>

            const record = data.data[0]

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
