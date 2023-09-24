import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import SummaryIcon from '@mui/icons-material/GridView'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material'

import {
  DeleteWithConfirmButton,
  ListBase,
  ListToolbar,
  Pagination,
  SearchInput,
  Title,
  TopToolbar,
  UpdateButton,
  useRecordContext,
} from 'react-admin'

import { ListPresetButtonGroup } from '../../react-admin/ListPresetButtonGroup'
import { MultiViewList } from '../../react-admin/MultiViewList'
import { JobsSummaryPivot } from '../../views/JobsSummary'
import { Header } from '../Header'
import { JobsAside } from './JobsAside'
import { JobDatagrid } from './JobsDatagrid'

const sortfilterToggles = [
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
    collapsable: true,
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
    icon: AccessTimeIcon,
    filterSpec: { status: ['scheduled'] },
    sortSpec: { field: 'run_at', order: 'ASC' },
    collapsable: true,
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
]

const ListActions = () => (
  <TopToolbar sx={{ justifyContent: 'flex-start' }}>
    <ListPresetButtonGroup sortfilterToggles={sortfilterToggles} />
  </TopToolbar>
)

export const JobsEditActions = () => {
  const record = useRecordContext()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {record.actions.includes('retry') && (
        <UpdateButton label="Retry" data={{}} />
      )}
      <DeleteWithConfirmButton color="primary" label="" />
    </Box>
  )
}

export const JobsList = () => {
  // const notify = useNotify()
  const theme = useTheme()
  return (
    <ListBase>
      <Title title="Jobs" />
      <Header />
      <ListActions />
      <Grid container>
        <Grid item xs={12} sm={8} order={{ xs: 2, sm: 1 }}>
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
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          <JobsAside />
        </Grid>
      </Grid>
    </ListBase>
  )
}
