import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SummaryIcon from '@mui/icons-material/GridView'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Box, Grid, useTheme } from '@mui/material'

import {
  DeleteWithConfirmButton,
  List,
  SearchInput,
  Title,
  TopToolbar,
  UpdateButton,
  useRecordContext,
} from 'react-admin'

import { CustomButtonDrawer, DrawerWidth } from '@moonlight-labs/core-base-fe'
import { ListPresetButtonGroup } from '../../react-admin/ListPresetButtonGroup'
import { MultiViewList } from '../../react-admin/MultiViewList'
import { JobsSummaryPivot } from '../../views/JobsSummary'
import { Header } from '../Header'
import { JobsAside } from './JobsAside'
import { JobDatagrid } from './JobsDatagrid'
import { EditJob } from './edit'


const sortfilterToggles = [
  {
    label: 'Summary',
    value: 'summary',
    icon: <SummaryIcon fontSize="small" />,
    filterSpec: { view: 'summary' },
    sortSpec: { field: 'run_at', order: 'ASC' },
  },
  {
    label: 'List',
    value: 'list',
    icon: <FormatListNumberedIcon fontSize="small" />,
    filterSpec: {},
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
]

const JobsFilters = [
  // <FauxInput key='views' source='views'><ListPresetButtonGroup sortfilterToggles={sortfilterToggles} /></FauxInput>,
  <SearchInput key="q" alwaysOn source="q" placeholder="Filter or search..." />,
]

const ListActions = () => (
  <TopToolbar>
    <ListPresetButtonGroup sortfilterToggles={sortfilterToggles} />
  </TopToolbar>
)

import React from 'react'

export const JobsEditActions = () => {
  const record = useRecordContext()
  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
    {record.actions.includes('retry') && (
        <UpdateButton label="Retry" data={{}} />
      )}
      <DeleteWithConfirmButton color="primary" label="" />
    </Box>  
  )
}


export const JobActions = ({ label = 'Actions' }: { label?: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <Box
      className="show-on-hover"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      {record.actions.includes('retry') && (
        <UpdateButton label="Retry" data={{}} />
      )}
      <CustomButtonDrawer
        label=" "
        drawerProps={{ title: 'Edit Jobs' }}
        // sx={{ display: 'inline-flex' }}
        mode="edit"
        drawerWidth={DrawerWidth.Medium}
        editProps={{actions: <JobsEditActions/>}}
      >
        <EditJob />
      </CustomButtonDrawer>
      <DeleteWithConfirmButton color="primary" label="" />
    </Box>
  )
}

export const JobsList = () => {
  // const notify = useNotify()
  const theme = useTheme()
  return (
    <Box>
      <Title title="Jobs" />
      <Header />
      <Grid container>
        {/* <Grid container> */}
        <Grid
          item
          xs={12}
          sm={8}
          order={{ xs: 2, sm: 1 }}
          sx={{
            overflowX: 'auto', // Enable horizontal scrolling
            whiteSpace: 'nowrap',
            // maxWidth: '100vh'
          }}
        >
          <List
            className="MuiGrid-root MuiGrid-container"
            title=" "
            actions={<ListActions />}
            exporter={false}
            filters={JobsFilters}
            // aside={<JobsAside />}
            sx={{
              '& .RaList-content': { boxShadow: 'none' },
            }}
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
        </Grid>
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          <JobsAside />
        </Grid>
      </Grid>
    </Box>
  )
}
