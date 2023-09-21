import { Box } from '@mui/material'
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SummaryIcon from '@mui/icons-material/GridView'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import {
  DeleteWithConfirmButton,
  List,
  SearchInput,
  Title,
  TopToolbar,
  UpdateButton,
  useRecordContext,
} from 'react-admin'

import { JobsAside } from './JobsAside'

import { ListPresetButtonGroup } from '../../react-admin/ListPresetButtonGroup'
import { MultiViewList } from '../../react-admin/MultiViewList'
import { JobsSummaryPivot } from '../../views/JobsSummary'
import { Header } from '../Header'
import { JobDatagrid } from './JobsDatagrid'

const JobsFilters = [
  <SearchInput key="q" alwaysOn source="q" placeholder="Filter or search..." />,
]

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
    icon: <WarningAmberIcon fontSize="small" />,
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
    icon: <RestartAltIcon fontSize="small" />,
    filterSpec: {},
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
]

const ListActions = () => (
  <TopToolbar>
    <ListPresetButtonGroup sortfilterToggles={sortfilterToggles} />
  </TopToolbar>
)

export const JobActions = ({ label = 'Actions' }: { label?: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <Box
      className="show-on-hover"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      {record.actions.includes('retry') && (
        <UpdateButton label="Retry" data={{}} />
      )}
      <DeleteWithConfirmButton color="primary" label="" />
    </Box>
  )
}

export const JobsList = () => {
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
