import { Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  Datagrid,
  ListBase,
  NumberField,
  TextField,
  WithListContext,
} from 'react-admin'
import { jobStatuses } from '../resource/jobs/jobsStatuses'

export const JobsSummaryPivot = () => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <ListBase
      disableSyncWithLocation
      // filters={[
      //   <FauxInput key="title" source="title" alwaysOn>
      //     <Typography variant="h6" sx={{ ml: 2 }}>
      //       Job Summary
      //     </Typography>
      //   </FauxInput>,
      //   // <SelectInput source='group' alwaysOn choices={[{id: 'queue', name: 'Queue'}, {id: 'job', name: 'Job Name'}]}/>
      // ]}
      // actions={<ListActions />}
      exporter={false}
      resource="JobReport"
      filter={{ id: 'jobs_by_type' }}
      // pagination={false}
      // sx={{
      //   '& .RaList-main': {
      //     border: 'solid 1px',
      //     borderColor: theme.palette.primary.light,
      //     borderRadius: '6px 6px 0 0',
      //     background: theme.palette.primary.main,
      //     color: theme.palette.primary.contrastText,
      //   },
      //   '& .RaList-content': {
      //     boxShadow: 'none',
      //     // borderRadius: 0,
      //   },
      // }}
    >
      <WithListContext
        render={({ data }) => {
          if (!data) return <div>No data</div>
          // console.debug('jobs_by_type', data)

          const processedData = data && data[0]?.data

          return (
            <Card>
              <Typography
                variant="h6"
                sx={{
                  p: 2,
                  // color: 'white',
                  // background: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  background: `color-mix(in srgb, ${theme.palette.primary.main} 20%, white)`,
                }}
              >
                Summary
              </Typography>
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
                {Object.keys(jobStatuses).map((status, idx) => {
                  const AltIcon = jobStatuses[status].icon
                  return (
                    <NumberField
                      key={idx}
                      source={status}
                      label={
                        moreThanSmall ? jobStatuses[status].label : <AltIcon />
                      }
                    />
                  )
                })}
              </Datagrid>
            </Card>
          )
        }}
      />
    </ListBase>
  )
}
