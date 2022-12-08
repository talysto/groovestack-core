import { Chip } from '@mui/material'
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
      { id: 'finished', name: 'Finished' },
      { id: 'errored', name: 'Errored' },
      { id: 'failed', name: 'Failed' },
      { id: 'expired', name: 'Expired' },
    ]}
  />,
]

const enhancedStatus = () => {
  const record = useRecordContext()
  var extended = null;

  switch (record.status) {
    case "running": {
      return <Chip label={record.status} color="success" size="small"  />
      break;
    }

    case "failed": {
      return <><Chip label={record.status} variant="outlined" color="error" size="small"  /><small style={{display: 'block'}}>{record.errorCount} retries</small></>
      break;
    }

    case "error": {
      return <><Chip label={record.status} variant="outlined" color="warning" size="small"  /><small style={{display: 'block'}}>{record.errorCount} retries</small></>
      break;
    }
  }

  return (
    <Chip label={record.status} size='small'/>
  )
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
        data: { expiredAt: null, runAt: dayjs().toISOString() },
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
        <TimeAgoField label="Scheduled" source="runAt" />
        {/* <NumberField source="errorCount" label="Errors" />
        <TimeAgoField label="Expired" source="expiredAt" /> */}
        <JobActions label="Actions" />
      </Datagrid>
    </List>
  )
}
