import { useTheme } from '@mui/material'
import {
  Datagrid,
  InfiniteList,
  List,
  NumberField,
  RefreshButton,
  TextField,
  TopToolbar,
} from 'react-admin'
import { TypographyInput } from '../react-admin/inputs/TypographyInput'

// columns={[
//   { key: 'sub_class', label: 'type' },
//   { key: 'count', label: 'queued' },
//   { key: 'count_working', label: 'working' },
//   { key: 'count_errored', label: 'errors' },
// ]}
const ListActions = () => (
  <TopToolbar>
    <RefreshButton />
  </TopToolbar>
)

// export const JobsSummary = () => {
//   return (
//     <InfiniteList
//       filters={[
//         <TypographyInput key="title" source="title" alwaysOn>
//           Jobs by Type
//         </TypographyInput>,
//       ]}
//       actions={<ListActions />}
//       exporter={false}
//       resource="JobStat"
//       disableSyncWithLocation
      
//     >
//       <Datagrid bulkActionButtons={false}>
//         <TextField source="sub_class" label="type" />
//         <NumberField source="count" label="queued" />
//         <NumberField source="count_working" label="working" />
//         <NumberField source="count_errored" label="errors" />
//       </Datagrid>
//     </InfiniteList>
//   )
// }

export const JobsSummaryPivot = () => {
  const theme = useTheme()
  return (
    <List
      disableSyncWithLocation
      filters={[
        <TypographyInput key="title" source="title" alwaysOn>
          Job Summary
        </TypographyInput>,
        // <SelectInput source='group' alwaysOn choices={[{id: 'queue', name: 'Queue'}, {id: 'job', name: 'Job Name'}]}/>
      ]}
      actions={<ListActions />}
      exporter={false}
      resource="JobStat"
      title=" "
      sx={{
        border: 'solid 1px #ccc',
        borderRadius: 4,
        // background: theme.palette.primary.light,
        m: 5,
        p: 2,
        // '& .RaList-content': { boxShadow: 'none' }
      }}
    >
      <Datagrid bulkActionButtons={false}>
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
