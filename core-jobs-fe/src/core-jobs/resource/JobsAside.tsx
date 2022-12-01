import { Typography, Card, CardContent } from "@mui/material";
import { useDataProvider, useResourceContext } from "react-admin";

import { Charts } from "../views";
import { LiveTable } from "./LiveTable";
import "./pivot.css";

export const JobsAside = () => {
  const dataProvider = useDataProvider()
  const resource = useResourceContext()

  const refreshJobStatsTable = () => {
    const resourcePath = resource.split('/')
    const namespacedResource = (resourcePath.length > 1) ? `${resourcePath[0]}/JobReport` : 'JobReport'

    return dataProvider.getList(namespacedResource, { filter: { reportName: 'job_stats' }, pagination: { page: null, perPage: null}, sort: { field: '', order: ''} })
  }

  const refreshWorkersTable = () => {
    const resourcePath = resource.split('/')
    const namespacedResource = (resourcePath.length > 1) ? `${resourcePath[0]}/locker` : 'locker'

    return dataProvider.getList(namespacedResource, { filter: {}, pagination: {page: 1, perPage: 100}, sort: { field: '', order: ''} })
  }

  const transformJobStatsData = ({ data }: { data: any}) => {
    return data[0].data
  }

  return (
    <div style={{ minWidth: "33%", marginLeft: "1em", marginRight: '1em' }}>
      <Typography
        style={{
          marginTop: "4em",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* <Card>
          <CardContent>
            <Charts.KPIs />

            <h3>Job RPM</h3>
            <Charts.RPM />
          </CardContent>
        </Card> */}

        <Card>
          <CardContent>
            <h3>Jobs by Type</h3>
            <LiveTable
              columns={[
                { key: 'sub_class', label: 'type'}, 
                { key: 'count', label: 'queued'}, 
                {key: 'count_working', label: 'working'}, 
                {key: 'count_errored', label: 'errors'}
              ]}
              refreshData={refreshJobStatsTable}
              refreshInterval={30}
              transform={transformJobStatsData}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Workers</h3>
            <LiveTable
              columns={[{ key: 'host'}, { key: 'pid'}, { key: 'workers'}]}
              refreshData={refreshWorkersTable}
              refreshInterval={30}
              transform={({data}) => data}
            />
          </CardContent>
        </Card>
      </Typography>
    </div>
  )
};
