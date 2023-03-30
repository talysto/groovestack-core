import React from 'react'

import { Chip, CircularProgress } from '@mui/material'
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'

import dayjs from 'dayjs'

import {
  Datagrid,
  DeleteWithConfirmButton,
  FunctionField,
  List,
  NumberField,
  SearchInput,
  SelectInput,
  TextField,
  useNotify,
  useRecordContext,
  Button,
  useDataProvider,
  useResourceContext,
  useRefresh,
} from 'react-admin'

import { JobsAside } from './JobsAside'
import { TimeAgoField } from './TimeAgoField'

const JobsFilters = [
  <SearchInput key="q" alwaysOn source="q" />,
  <SelectInput
    key="status"
    alwaysOn
    source="status"
    choices={[
      { id: 'scheduled', name: 'Scheduled' },
      { id: 'running', name: 'Running' },
      { id: 'complete', name: 'Complete' },
      { id: 'errored', name: 'Errored' },
      { id: 'failed', name: 'Failed' },
      { id: 'expired', name: 'Expired' },
    ]}
  />,
]

const enhancedStatus = () => {
  const record = useRecordContext()
  // var extended = null;

  const runningIcon = <CircularProgress size="0.75em" />

  switch (record.status) {
    case 'running': {
      return (
        <Chip label={'Running'} color="info" size="small" icon={runningIcon} />
      )
    }

    case 'failed': {
      return (
        <Chip label={'Failed'} variant="outlined" color="error" size="small" />
      )
    }

    case 'error': {
      // icon={<RunningWithErrorsIcon />
      return (
        <Chip
          label={`Error: 3/5 retries`}
          variant="outlined"
          color="warning"
          size="small"
        />
      )
    }

    case 'scheduled': {
      return <Chip label={'Scheduled'} size="small" />
    }

    case 'complete': {
      return <Chip label={'Complete'} size="small" />
    }
  }

  return <Chip label={record.status} size="small" />
}

export const RetryButton: React.FC = () => {
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const record = useRecordContext()
  const refresh = useRefresh()
  const resource = useResourceContext()

  if (!record) return null

  const triggerRetry = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      await dataProvider.update(resource, {
        id: record.id,
        previousData: record,
        data: { expired_at: null, runAt: dayjs().toISOString() },
      })
      notify('Retry triggered!', { type: 'success' })
      refresh()
    } catch (e) {
      console.error(e)
      notify(JSON.stringify(e), { type: 'error' })
    }
  }

  return <Button label="Retry" color="secondary" onClick={triggerRetry} />
}

const JobActions = ({ label }: { label?: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      {record.actions.includes('retry') && <RetryButton />}
      <DeleteWithConfirmButton label="" />
    </div>
  )
}

export const Table = () => {
  const notify = useNotify()

  return (
    <List exporter={false} filters={JobsFilters} aside={<JobsAside />}>
      <Datagrid sort={{ field: 'priority', order: 'ASC' }} rowClick="edit">
        <FunctionField
          label="Job"
          render={(record: any) => (
            <div>
              <div>{record.type}</div>
              <small style={{ marginRight: 5 }}>
                {record.id.substring(0, 6)}
              </small>
            </div>
          )}
        />

        <TextField source="queue" sortable={false} />
        <NumberField source="priority" />
        <FunctionField label="Status" render={enhancedStatus} />
        <TimeAgoField label="Scheduled" source="run_at" />
        {/* <NumberField source="errorCount" label="Errors" />
        <TimeAgoField label="Expired" source="expired_at" /> */}
        <JobActions label="Actions" />
      </Datagrid>
    </List>
  )
}
