import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  Datagrid,
  List,
  NumberField,
  RefreshButton,
  TextField,
  TopToolbar,
  WithListContext,
} from 'react-admin'
import { FauxInput } from '../react-admin/inputs/TypographyInput'

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
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('md'))
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
      resource="JobReport"
      filter={{ id: 'jobs_by_type' }}
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
      <WithListContext
        render={({ data }) => {
          // if (!data) return <div>No data</div>
          console.debug('jobs_by_type', data)

          const processedData = data && data[0]?.data

          return (
            <Datagrid
              data={processedData || data}
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

              {moreThanSmall && <NumberField source="queued" label="queued" />}
              {moreThanSmall && (
                <NumberField source="running" label="running" />
              )}
              {moreThanSmall && <NumberField source="error" label="error" />}
              {moreThanSmall && <NumberField source="failed" label="failed" />}
              {moreThanSmall && (
                <NumberField source="complete" label="complete" />
              )}
            </Datagrid>
          )
        }}
      />
    </List>
  )
}
