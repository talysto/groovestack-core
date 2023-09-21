import { Box, Chip, CircularProgress } from '@mui/material'
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SummaryIcon from '@mui/icons-material/GridView'


import {
  Datagrid,
  DeleteWithConfirmButton,
  FunctionField,
  List,
  NumberField,
  RaRecord,
  SearchInput,
  TextField,
  Title,
  TopToolbar,
  useRecordContext,
} from 'react-admin'

import { JobsAside } from '../JobsAside'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { JobsSummaryPivot } from '../../views/JobsSummary'
import { ListViewToggleButtons } from './ListViewToggleButtons'
import { MultiViewList } from './MultiViewList'
import { Header } from '../Header'
import { RetryButton } from './RetryButton'

const JobsFilters = [
  <SearchInput key="q" alwaysOn source="q" placeholder="Filter or search..." />,
]

const enhancedStatus = (record: RaRecord) => {
  // var extended = null;
  const runningIcon = <CircularProgress size="0.75em" />

  const statusMap: { [key: string]: JSX.Element } = {
    running: <Chip label={'Running'} size="small" icon={runningIcon} />,
    failed: (
      <Chip label={'Failed'} variant="outlined" color="error" size="small" />
    ),
    error: <Chip label={`Error/Retry`} variant="outlined" size="small" />,
    scheduled: <Chip label={'Scheduled'} size="small" />,
    queued: <Chip label={'Queued'} size="small" />,
    complete: <Chip label={'Complete'} size="small" />,
  }

  return statusMap[record.status] || <Chip label={record.status} size="small" />
}

const sortfilterToggles = [
  {
    label: 'Summary',
    value: 'summary',
    icon: <SummaryIcon fontSize="small" />,
    filterSpec: { view: 'summary' },
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
  {
    label: 'Errors',
    value: 'errors',
    icon: <SummaryIcon fontSize="small" />,
    filterSpec: { status: ['errored', 'failed'] },
    sortSpec: { field: 'priority', order: 'ASC' },
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
    icon: <AccessTimeIcon fontSize="small" />,
    filterSpec: { status: ['scheduled'] },
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
  {
    label: 'Reset',
    value: 'reset',
    icon: <SummaryIcon fontSize="small" />,
    filterSpec: {},
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
]

const ListActions = () => (
  <TopToolbar>
    {/* <ListViewToggleButtons sortfilterToggles={sortfilterToggles} /> */}
  </TopToolbar>
)
// import * as style from "./show-on-hover.css"

const JobActions = ({ label = 'Actions' }: { label?: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <Box
      className="show-on-hover"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      {record.actions.includes('retry') && <RetryButton />}
      <DeleteWithConfirmButton color="primary" label="" />
    </Box>
  )
}

export const Table = () => {
  // const notify = useNotify()
  return (
    <Box sx={{ pt: 1 }}>
      <Title title="Jobs" />
      <Header />

      <List
        title=" "
        actions={<ListActions />}
        exporter={false}
        filters={JobsFilters}
        aside={<JobsAside />}
        sx={{ '& .RaList-content': { boxShadow: 'none' } }}
      >
        <ListViewToggleButtons sortfilterToggles={sortfilterToggles} />
        <MultiViewList
          views={{
            summary: (
              <>
                <JobsSummaryPivot />
              </>
            ),
          }}
        >
          <JobDatagrid />
        </MultiViewList>
      </List>
    </Box>
  )
}

const JobDatagrid = () => (
  <Datagrid sort={{ field: 'priority', order: 'ASC' }} rowClick="edit">
    <FunctionField
      label="Job"
      render={(record: any) => (
        <div>
          <div>{record.type}</div>
          <small style={{ marginRight: 5 }} title={record.id}>
            {record.id.substring(0, 6)}
          </small>
        </div>
      )}
    />

    <TextField source="queue" sortable={false} />
    <NumberField source="priority" />
    <FunctionField label="Status" render={enhancedStatus} />

    <TimeAgoField label="Scheduled" source="run_at" />
    <JobActions label="" />
  </Datagrid>
)
