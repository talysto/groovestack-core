import { Stack } from '@mui/material'
import { Metric } from '../components/Metric'
import { JobsKPIsContext } from './jobs/JobsList'
import { useContext } from 'react'
import { JobReportShow } from '../views/JobReportShow'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'


export const JobReportKPIsLive = () => {
  const kpis = useContext(JobsKPIsContext)

  return (
    <JobReportShow id="jobs_kpis" data={kpis}>
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(record: RaRecord) => {
            if (!record?.data?.[0]) return <div>No data</div>

            const data = record.data[0]

            return (
              <Stack sx={{ flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                <Metric
                  value={data.scheduled}
                  label="Scheduled"
                  key="scheduled"
                />
                <Metric value={data.queued} label="Queued" key="queued" />
                <Metric
                  value={data.errored + data.failed}
                  label="Errors"
                  key="errors"
                />
                <Metric
                  value={data.completed}
                  label="Completed"
                  key="complete"
                />
              </Stack>
            )
          }}
        />
      </SimpleShowLayout>
    </JobReportShow>
  )
}
