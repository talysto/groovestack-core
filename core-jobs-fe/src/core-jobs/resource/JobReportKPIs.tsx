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

            return (
              <Stack sx={{ flexDirection: 'row', gap: 2 }}>
                <Metric value={record.scheduled} label="Queued" key="scheduled" />
                <Metric value={record.queued} label="Queued" key="queued" />
                <Metric value={record.errored + record.failed} label="Errors" key="errors" />
                <Metric value={record.completed} label="Errors" key="complete" />
              </Stack>
            )
          }}
        />
      </SimpleShowLayout>
    </JobReportShow>
  )
}
