import { Box, Checkbox, Chip, CircularProgress, FormControlLabel, Grid, ListItemIcon, ListItemText, MenuItem, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ListIcon from '@mui/icons-material/List';

import dayjs from 'dayjs'

import {Button as MuiButton} from '@mui/material'

import {
  Button,
  CheckboxGroupInput,
  Datagrid,
  DeleteWithConfirmButton,
  FilterButton,
  FilterList,
  FilterListItem,
  FunctionField,
  List,
  NumberField,
  RaRecord,
  SearchInput,
  SelectArrayInput,
  TextField,
  TopToolbar,
  useDataProvider,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
} from 'react-admin'
import Check from '@mui/icons-material/Check'

import { JobsAside } from '../JobsAside'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { Metric } from '../../Metric'
import { statuses } from '../../views/RPMChart'
import { jobStatuses } from './jobsStatuses'
import SortFilterButton from '../../SortFilterButton'
import { ReactNode } from 'react'

const JobsFilters = [
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

  const statusMap: {[key: string]: JSX.Element} = {
    'running': <Chip label={'Running'} size="small" icon={runningIcon} />,
    'failed': <Chip label={'Failed'} variant="outlined" color="error" size="small" />,
    'error': <Chip
          label={`Error/Retry`}
          variant="outlined"
          size="small"
        />,
    'scheduled': <Chip label={'Scheduled'} size="small" />,
    'queued': <Chip label={'Queued'} size="small" />,
    'complete': <Chip label={'Complete'} size="small" />
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

const ListActions = () => <TopToolbar>
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
    <ToggleButton defaultChecked value="right" key="all"><ListIcon fontSize="small" /> All</ToggleButton>,
    <ToggleButton value="right" key="error"><WarningAmberIcon fontSize="small" /> Errors</ToggleButton>,
    <ToggleButton value="right" key="error"><AccessTimeIcon fontSize="small" /> Scheduled</ToggleButton>
  </ToggleButtonGroup>
  {/* <SortFilterButton label='Clear' sortSpec={{field: 'run_at', order: 'ASC'}} filterSpec={{}} />
  <SortFilterButton label='14m Latency' sortSpec={{field: 'run_at', order: 'ASC'}} filterSpec={{status: ['queued']}} />
  <SortFilterButton label='14 Errors' sortSpec={{field: 'priority', order: 'ASC'}} filterSpec={{status: ['errored', 'failed']}} />
  <SortFilterButton label='14,000 Scheduled' sortSpec={{field: 'run_at', order: 'DESC'}} filterSpec={{status: ['scheduled', 'queued']}} /> */}

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

const JobActions = ({ label = 'Actions' }: { label?: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      {record.actions.includes('retry') && <RetryButton />}
      <DeleteWithConfirmButton color="primary"  label="" />
    </div>
  )
}

export const Table = () => {
  const notify = useNotify()
  return (
    <>
      <Stack
        direction="row"
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
          <Typography variant="h3" sx={{ pr: 4 }}>
            <span style={{fontWeight: 700}}>CORE</span><span style={{fontWeight: 200}}>Jobs</span>
          </Typography>
          {/* <Metric value="14" label="Queued" units="k" />
          <Metric value="32" label="Latency" units="min" />
          <Metric value="4" label="Errors" /> */}
      </Stack>

      <List
      actions={<ListActions />}
      exporter={false}
      filters={JobsFilters}
      aside={<JobsAside />}>
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
          {/* <NumberField source="errorCount" label="Errors" />
        <TimeAgoField label="Expired" source="expired_at" /> */}
          <JobActions label="Actions" />
        </Datagrid>
      </List>
    </>
  )
}
