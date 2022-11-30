import { Typography, Card, CardContent } from "@mui/material";
import { useDataProvider, useResourceContext } from "react-admin";

import { Charts } from "../views";
import { LiveTable } from "./LiveTable";
import "./pivot.css";

export const JobsAside = () => {
  const dataProvider = useDataProvider()
  const resource = useResourceContext()

  const refreshWorkersTable = () => {
    const resourcePath = resource.split('/')
    const namespacedResource = (resourcePath.length > 1) ? `${resourcePath[0]}/locker` : 'locker'

    return dataProvider.getList(namespacedResource, { filter: {}, pagination: {page: 1, perPage: 100}, sort: { field: '', order: ''} })
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
            <table className="pivot-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>QUEUED</th>
                  <th>RUNNING</th>
                  <th>ERRORS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mailer:Welcome</td>
                  <td>102</td>
                  <td>3</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Workers</h3>
            <LiveTable
              columns={['host', 'pid', 'workers']}
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
