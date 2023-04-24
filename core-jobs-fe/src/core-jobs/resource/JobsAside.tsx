import React from 'react'
import { Typography, Card, CardContent, Box, Skeleton } from '@mui/material'
import { useDataProvider, useResourceContext } from 'react-admin'

import { LiveTable } from './LiveTable'
import './pivot.css'

export const JobsAside = () => {
  const dataProvider = useDataProvider()
  const resource = useResourceContext()

  const refreshJobStatsTable = () => {
    const resourcePath = resource.split('/')
    const namespacedResource =
      resourcePath.length > 1 ? `${resourcePath[0]}/JobReport` : 'JobReport'

    return dataProvider.getList(namespacedResource, {
      filter: { reportName: 'job_stats' },
      pagination: { page: 0, perPage: 10 },
      sort: { field: '', order: '' },
    })
  }

  const refreshWorkersTable = () => {
    const resourcePath = resource.split('/')
    const namespacedResource =
      resourcePath.length > 1 ? `${resourcePath[0]}/locker` : 'locker'

    return dataProvider.getList(namespacedResource, {
      filter: {},
      pagination: { page: 1, perPage: 100 },
      sort: { field: '', order: '' },
    })
  }

  const transformJobStatsData = ({ data }: { data: any }) => {
    return data[0].data
  }

  return (
    <Box
      sx={{
        minWidth: '33%',
        marginLeft: '1em',
        marginRight: '1em',
        mt: 8,
        gap: 3,
      }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Jobs by Type</Typography>
          <LiveTable
            columns={[
              { key: 'sub_class', label: 'type' },
              { key: 'count', label: 'queued' },
              { key: 'count_working', label: 'working' },
              { key: 'count_errored', label: 'errors' },
            ]}
            emptyContent={
              <tr>
                <td colSpan={4}>
                  <Box style={{ width: '100%' }}>
                    <Skeleton animation={false} />
                    <Skeleton animation={false} />
                    <Skeleton animation={false} />
                    <div style={{ textAlign: 'center' }}>
                      No jobs in the queue
                    </div>
                  </Box>
                </td>
              </tr>
            }
            refreshData={refreshJobStatsTable}
            refreshInterval={30}
            transform={transformJobStatsData}
            rowTotals
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Workers</Typography>
          <LiveTable
            columns={[
              { key: 'host', render: (v: string) => v.substring(0, 6) },
              { key: 'pid' },
              { key: 'workers' },
            ]}
            refreshData={refreshWorkersTable}
            refreshInterval={30}
            transform={({ data }) => data}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
