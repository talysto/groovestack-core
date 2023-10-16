import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import SummaryIcon from '@mui/icons-material/GridView'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material'
import {
  Button,
  Confirm,
  DeleteWithConfirmButton,
  ListBase,
  ListToolbar,
  Pagination,
  RaRecord,
  SearchInput,
  SelectArrayInput,
  Title,
  TopToolbar,
  UpdateButton,
  useDataProvider,
  useDeleteMany,
  useListContext,
  useNotify,
  useRecordContext,
  useShowController,
} from 'react-admin'

import { useSubscribeToRecord } from '@react-admin/ra-realtime'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  ListPresetButtonGroup,
  ListViewToggleButtonsProps,
} from '../../react-admin/ListPresetButtonGroup'
import { MultiViewList } from '../../react-admin/MultiViewList'
import { JobsSummaryPivot } from '../../views/JobsSummary'
import { Header } from '../Header'
import { JobsAside } from './JobsAside'
import { JobDatagrid } from './JobsDatagrid'
import { jobStatuses } from './jobsStatuses'

export const JobsKPIsContext = createContext<RaRecord>({} as RaRecord)

const sortfilterToggles: ListViewToggleButtonsProps['sortfilterToggles'] = [
  {
    label: 'Summary',
    value: 'summary',
    icon: SummaryIcon,
    filterSpec: { view: 'summary' },
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
  {
    label: 'List',
    value: 'list',
    icon: FormatListNumberedIcon,
    filterSpec: {},
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
  {
    label: 'Errors',
    value: 'errors',
    icon: WarningAmberIcon,
    filterSpec: { status: ['errored', 'failed'] },
    sortSpec: { field: 'priority', order: 'ASC' },
    collapsable: true
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
    icon: AccessTimeIcon,
    filterSpec: { status: ['scheduled'] },
    sortSpec: { field: 'run_at', order: 'ASC' },
    collapsable: true
  },
]

const JobsFilters = [
  // <FauxInput key='views' source='views'><ListPresetButtonGroup sortfilterToggles={sortfilterToggles} /></FauxInput>,
  <SearchInput
    sx={{ ml: 2 }}
    key="q"
    alwaysOn
    source="q"
    placeholder="Filter or search..."
  />,
  <SelectArrayInput
    source="status"
    alwaysOn
    label={false}
    // TODO: This pt works but is not scalable
    sx={{'& .MuiSelect-select': {pt: '12px'}}}
    placeholder="Status"
    choices={Object.keys(jobStatuses).map((status) => ({
      id: status,
      name: jobStatuses[status].label,
    }))}
  />,
]

const PurgeButton = () => {
  const notify = useNotify()
  const { refetch } = useListContext()
  const [deleteMany, {isLoading}] = useDeleteMany()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen(false)
  const onClick = () => setOpen(true)
  
  const purgeJobs = async () => {
    try {
      // use the default scope from core-jobs purge for now
      await deleteMany('Job', {
        ids: [],
        // meta: { params: { job_scope: "status = 'failed'"}}
      }, {
        onSuccess: (ids) => {
          notify(`${ids.length} jobs purged`, { type: 'info'})
          refetch()
          onClose()
        }
      })
    } catch(e) {
      console.log(e)
      notify('Error purging jobs', { type: 'error'})
    }
  }

  return (
    <>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={"Purge Completed Jobs"}
        content="Are you sure you want to delete all jobs that completed at least 1 day ago?"
        onConfirm={purgeJobs}
        onClose={onClose}
      />
      <Button sx={{ ml: 'auto' }} onClick={onClick} label="Purge"/>
    </>
  )
}

const ListActions = () => {
  
  const [toggles, setToggles] = useState(sortfilterToggles)
  const kpis = useContext(JobsKPIsContext)

  const updateToggles = (data: any) => {
    const newToggles = toggles.map((t) => {
      if (t.value === 'errors') {
        t.count = data.errored + data.failed
      }
      if (t.value === 'scheduled') {
        t.count = data.scheduled
      }

      return t
    })

    setToggles(newToggles)
  }

  useEffect(() => {
    if (kpis?.data?.[0]) updateToggles(kpis.data[0])
  }, [kpis])

  return (
    <TopToolbar sx={{ justifyContent: 'flex-start' }}>
      <ListPresetButtonGroup sortfilterToggles={toggles} />
      <PurgeButton />
    </TopToolbar>
  )
}

// export const JobsEditActions = () => {
//   const record = useRecordContext()

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//       {record.actions.includes('retry') && (
//         <UpdateButton label="Retry" data={{ instance_method: 'retry!' }} />
//       )}
//       {record.actions.includes('run_now') && (
//         <UpdateButton label="Run Now" data={{ instance_method: 'run_now!' }} />
//       )}
//       {record.actions.includes('delete') && <DeleteWithConfirmButton color="primary" label="" />}
//     </Box>
//   )
// }

export const JobsList = () => {
  const theme = useTheme()
  const [kpis, setKpis] = useState<RaRecord>({} as RaRecord)
  const dataProvider = useDataProvider()

  const handleEventReceived = ({ type, payload }: any) => { if (type != 'subscribe') setKpis({id: 'jobs_kpis', data: payload.data})}

  // initial fetch
  useShowController({
    resource: 'JobReport',
    id: 'jobs_kpis',
    queryOptions: { onSuccess(report) { setKpis(report) } }
  })

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(handleEventReceived, 'JobReport', 'jobs_kpis', { enabled })

  return (
    <JobsKPIsContext.Provider value={kpis}>
      <ListBase filterDefaultValues={{ view: 'summary' }}>
        <Title title="Jobs" />

        <Grid container>
          <Grid item xs={12} order={1}>
            <Header />
          </Grid>
          <Grid item xs={12} sm={8} order={{ xs: 3, sm: 2 }}>
            <ListActions />
            <MultiViewList
              views={{
                summary: <JobsSummaryPivot />,
              }}
            >
              <Card sx={{ maxWidth: '100vw' }}>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    background: `color-mix(in srgb, ${theme.palette.primary.main} 20%, white)`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      flex: 1,
                      p: 2,
                      // color: 'white',
                      // background: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    }}
                  >
                    All Jobs
                  </Typography>
                </Stack>
                <ListToolbar filters={JobsFilters} />
                <JobDatagrid />
                <Pagination />
              </Card>
            </MultiViewList>
          </Grid>
          <Grid item xs={12} sm={4} order={{ xs: 2, sm: 3 }}>
            <JobsAside />
          </Grid>
        </Grid>
      </ListBase>
    </JobsKPIsContext.Provider>
  )
}
