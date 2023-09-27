import { Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  Datagrid,
  FunctionField,
  NumberField,
  RaRecord,
  SimpleShowLayout,
  TextField,
} from 'react-admin'
import { jobStatuses } from '../resource/jobs/jobsStatuses'
import { JobReportShow } from './JobReportShow'

export const JobsSummaryPivot = () => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <JobReportShow id="jobs_by_type">
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(data: RaRecord) => {
            if (!data) return <div>No data</div>

            const processedData = data.data

            console.log('data', data)
            console.log('processedData', processedData)

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
                  data={processedData}
                  total={5}
                  isLoading={false}
                  sort={{ field: 'sub_class', order: 'ASC' }}
                  bulkActionButtons={false}
                  sx={{
                    '& .RaDatagrid-headerCell': {
                      background: blueGrey[50],
                      color: theme.palette.primary.main,
                      borderRadius: '0px !important',
                    },
                  }}
                >
                  <TextField source="sub_class" label="type" sortable={false} />
                  {Object.keys(jobStatuses).map((status, idx) => {
                    const AltIcon = jobStatuses[status].icon
                    return (
                      <NumberField
                        key={idx}
                        source={status}
                        sortable={false}
                        label={
                          moreThanSmall ? (
                            jobStatuses[status].label
                          ) : (
                            <AltIcon />
                          )
                        }
                      />
                    )
                  })}
                </Datagrid>
              </Card>
            )
          }}
        />
      </SimpleShowLayout>
    </JobReportShow>
  )
}
