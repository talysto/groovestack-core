import { Stack } from '@mui/material'
import { Metric } from '../components/Metric'
import { JobsKPIsContext } from './jobs/JobsList'
import { useContext } from 'react'
import { JobReportShow } from '../views/JobReportShow'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'


export const JobReportKPIsLive = () => {
  const kpis = useContext(JobsKPIsContext)

  if (kpis.length < 1) return null

  const data = kpis[0]

  return (
    <JobReportShow id="jobs_kpis" data={data}>
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(record: RaRecord) => {
            if (!record) return <div>No data</div>

            return (
              <Stack sx={{ flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                <Metric
                  value={record.scheduled}
                  label="Scheduled"
                  key="scheduled"
                />
                <Metric value={record.queued} label="Queued" key="queued" />
                <Metric
                  value={record.errored + record.failed}
                  label="Errors"
                  key="errors"
                />
                <Metric
                  value={record.completed}
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
