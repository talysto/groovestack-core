import { Typography, Card, CardContent } from "@mui/material";
import { Charts } from "../views";
import "./pivot.css";

export const JobsAside = () => (
  <div style={{ minWidth: "33%", margin: "1em" }}>
    <Typography
      style={{
        marginTop: "4em",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Card>
        <CardContent>
          <Charts.KPIs />

          <h3>Job RPM</h3>
          <Charts.RPM />
        </CardContent>
      </Card>

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
          <table className="pivot-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>HOST</th>
                <th>PID</th>
                <th>WORKERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a6d52a</td>
                <td>28472</td>
                <td>6</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Typography>
  </div>
);
