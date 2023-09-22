import { Typography, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  Datagrid,
  List,
  NumberField,
  RefreshButton,
  TextField,
  TopToolbar,
} from 'react-admin'
import { FauxInput } from '../react-admin/inputs/TypographyInput'


const ListActions = () => (
  <TopToolbar>
    <RefreshButton />
  </TopToolbar>
)


export const JobsSummaryPivot = () => {
  const theme = useTheme()
  return (
    <List
      disableSyncWithLocation
      filters={[
        <FauxInput key="title" source="title" alwaysOn>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Job Summary
          </Typography>
        </FauxInput>,
        // <SelectInput source='group' alwaysOn choices={[{id: 'queue', name: 'Queue'}, {id: 'job', name: 'Job Name'}]}/>
      ]}
      // actions={<ListActions />}
      exporter={false}
      resource="JobStat"
      title=" "
      pagination={false}
      sx={{
        '& .RaList-main': {
          border: 'solid 1px',
          borderColor: theme.palette.primary.light,
          borderRadius: '6px 6px 0 0',
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '& .RaList-content': {
          boxShadow: 'none',
          // borderRadius: 0,
        },
      }}
    >
      <Datagrid
        bulkActionButtons={false}
        sx={{
          '& .RaDatagrid-headerCell': {
            background: blueGrey[50],
            color: theme.palette.primary.main,
            borderRadius: '0px !important',
          },
        }}
      >
        <TextField source="sub_class" label="type" />
        <NumberField source="scheduled" label="scheduled" />
        <NumberField source="queued" label="queued" />
        <NumberField source="running" label="running" />
        <NumberField source="error" label="error" />
        <NumberField source="failed" label="failed" />
        <NumberField source="complete" label="complete" />
      </Datagrid>
    </List>
  )
}
