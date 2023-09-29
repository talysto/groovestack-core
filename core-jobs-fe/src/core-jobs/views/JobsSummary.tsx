import { Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  Datagrid,
  FunctionField,
  RaRecord,
  SimpleShowLayout,
  TextField,
} from 'react-admin'
import { numberToHuman } from '../components/util'
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

            const processedData = structuredClone(data.data)

            // Add an extra total row
            const totals = Object.keys(processedData[0]).reduce((acc, key) => {
              const val = processedData.reduce((prev: any, row: { [x: string]: any} ) => prev + row[key], 0)
              return ({
                ...acc, [key]: isNaN(val) ? null : val
              })
            }, {})

            processedData.push(totals)

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
                    '& .RaDatagrid-rowCell:not(:first-child)': {
                      textAlign: 'center'
                    }
                  }}
                >
                  <TextField source="sub_class" label="type" sortable={false} />
                  {Object.keys(jobStatuses).map((status, idx) => {
                    const AltIcon = jobStatuses[status].icon
                    return (
                      <FunctionField
                        key={idx}
                        sortable={false}
                        render={(record: any) => (
                          <span
                            title={new Intl.NumberFormat().format(
                              record[status],
                            )}
                          >
                            {numberToHuman(record[status] || 0)}
                          </span>
                        )}
                        label={
                          moreThanSmall ? (
                            jobStatuses[status].label
                          ) : (
                            <AltIcon />
                          )
                        }
                      />

                      // <NumberField
                      //   key={idx}
                      //   source={status}
                      //   sortable={false}
                      //   label={
                      //     moreThanSmall ? (
                      //       jobStatuses[status].label
                      //     ) : (
                      //       <AltIcon />
                      //     )
                      //   }
                      // />
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
