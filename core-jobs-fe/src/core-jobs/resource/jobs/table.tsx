import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SummaryIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import dayjs from 'dayjs'

import {
  Button,
  Datagrid,
  DeleteWithConfirmButton,
  FunctionField,
  List,
  NumberField,
  RaRecord,
  SearchInput,
  TextField,
  TopToolbar,
  useDataProvider,
  useListContext,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
} from 'react-admin'

import { JobsAside } from '../JobsAside'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { Metric } from '../../Metric'
import SortFilterButton from '../../SortFilterButton'
import { JobsSummaryPivot } from '../../views/JobsSummary'

const JobsFilters = [
  // <FauxInput key="title" alwaysOn source="any">
  //   <Typography variant="h3" sx={{ pr: 4 }}>
  //     <span style={{fontWeight: 700}}>CORE</span><span style={{fontWeight: 200}}>Jobs</span>
  //   </Typography>
  // </FauxInput>,
  <SearchInput key="q" alwaysOn source="q" placeholder="Filter or search..." />,
  // <SelectArrayInput key='s' alwaysOn source="status" choices={statuses.map((status) => (
  //   {
  //     id: status,
  //     // name: <FormControlLabel control={<Checkbox defaultChecked />} label={status} />
  //     name: <MenuItem>
  //     <ListItemIcon>
  //       <Check />
  //     </ListItemIcon>
  //     <ListItemText>{status}</ListItemText>
  //     <Typography variant="body2" color="text.secondary">34</Typography>
  //   </MenuItem>
  //   }))} />
  // <CheckboxGroupInput
  //   key="status"
  //   alwaysOn
  //   source="status"
  //   choices={jobStatuses}
  // />,
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

export const RetryButton = () => {
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

  return <Button label="Retry" onClick={triggerRetry} />
}

const ListActions = () => (
  <TopToolbar>
    {/* <>
    <FilterList label="Status" icon={<Check />}>
        <FilterListItem
        label={<><Typography component='span'>Scheduled</Typography><Typography component='span' color="text.secondary">24,200</Typography></>}
        value={{ has_newsletter: true }} />
        <FilterListItem
        label={<Box  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><Typography component='span'>Queued</Typography><Typography component='span' color="text.secondary">200</Typography></Box>}
        value={{ status: ['scheduled'] }} />
    </FilterList>
  </> */}
    <ToggleButtonGroup size="small">
      <ToggleButton value="summary" key="error">
        <SummaryIcon fontSize="small" />
        <span style={{ marginLeft: 4 }}>Summary</span>
      </ToggleButton>
      ,
      <ToggleButton defaultChecked value="list" key="all">
        <ListIcon fontSize="small" />
        <span style={{ marginLeft: 4 }}>List</span>
      </ToggleButton>
      ,
      <ToggleButton value="errors" key="error">
        <WarningAmberIcon fontSize="small" />
        <span style={{ marginLeft: 4 }}>Errors</span>
      </ToggleButton>
      ,
      <ToggleButton value="scheduled" key="error">
        <AccessTimeIcon fontSize="small" />
        <span style={{ marginLeft: 4 }}>Scheduled</span>
      </ToggleButton>
    </ToggleButtonGroup>

    <SortFilterButton
      label="Summary"
      sortSpec={{ field: 'run_at', order: 'ASC' }}
      filterSpec={{ view: 'summary' }}
    />
    <SortFilterButton
      label="Reset"
      sortSpec={{ field: 'run_at', order: 'ASC' }}
      filterSpec={{}}
    />
    {/* <SortFilterButton label='14m Latency' sortSpec={{field: 'run_at', order: 'ASC'}} filterSpec={{status: ['queued']}} /> */}
    <SortFilterButton
      label="Errors"
      sortSpec={{ field: 'priority', order: 'ASC' }}
      filterSpec={{ status: ['errored', 'failed'] }}
    />
    {/* <SortFilterButton label='14,000 Scheduled' sortSpec={{field: 'run_at', order: 'DESC'}} filterSpec={{status: ['scheduled', 'queued']}} />  */}

    {/* <Button href="?sort=run_at" label="14 Queued" onClick={() => {}} /> */}
    {/* <Button label="32 min Latency"   onClick={() => {}} /> */}
    {/* <FilterListItem
        label={<Box  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><Typography component='span'>Queued</Typography><Typography component='span' color="text.secondary">200</Typography></Box>}
        value={{ status: ['scheduled'] }} /> */}
    {/* <MuiButton onClick={() => {}}>
    <Typography component='div' sx={{fontWeight: 'bold'}}>14</Typography><Typography component='div' color="text.secondary">Errors</Typography>
  </MuiButton> */}
    {/* <Metric value="4" label="Errors" /> */}
    {/* <FilterButton /> */}
    {/* <Metric value="14" label="Queued" units="k" />
<Metric value="32" label="Latency" units="min" />
<Metric value="4" label="Errors" /> */}
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

const Header = () => (
  <>
    <style>
      {`
tr > td > .show-on-hover {
  visibility: hidden;
}

tr:hover > td > .show-on-hover {
  visibility: visible;
}
`}
    </style>
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{}}>
        <span style={{ fontWeight: 700 }}>CORE</span>
        <span style={{ fontWeight: 200 }}>Jobs</span>
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          minWidth: '33%',
          m: 2,
          pr: 2,
          pl: 2,
        }}
      >
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="14" label="Queued" units="k" />
        </Box>
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="32" label="Latency" units="min" />
        </Box>
        <Box sx={{ flexBasis: '100%' }}>
          <Metric value="4" label="Errors" />
        </Box>
      </Stack>
    </Stack>
  </>
)

export const Table = () => {
  // const notify = useNotify()
  return (
    <Box sx={{ pt: 1 }}>
      <Header />

      <List
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
                {/* <JobsSummary /> */}
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

const MultiViewList = ({
  children,
  views,
}: {
  children: React.ReactNode
  views: { [key: string]: JSX.Element }
}) => {
  const { filterValues } = useListContext()

  if (filterValues.view && views[filterValues.view])
    return views[filterValues.view]

  return children
}
