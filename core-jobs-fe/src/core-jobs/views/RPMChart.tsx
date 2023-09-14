import { ToggleButtonInput } from '@moonlight-labs/core-base-fe'
import { List, Loading, RefreshButton, WithListContext } from 'react-admin'
import { Chart as GoogleChart } from 'react-google-charts'
import { TypographyInput } from './TypographyInput'
const chartFilters = [
  <TypographyInput alwaysOn>RPM Chart</TypographyInput>,
  <ToggleButtonInput
    alwaysOn
    source="status"
    label={false}
    size="small"
    choices={[
      { id: 'queued', name: 'Queued' },
      { id: 'errored', name: 'Errored' },
      { id: 'errored', name: 'Complete' },
    ]}
  />,
]

export const RPMChart = ({ data }: { data?: any }) => {
  // if (!data) return <>No recent data.</>;

  const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)
  const sampleData = [
    ['Period', 'Jobs'],
    [new Date(roundedNow.getTime() - 1000 * 60 * 60), 1],
    [new Date(roundedNow.getTime() - 800 * 60 * 60), 2],
    [new Date(roundedNow.getTime() - 600 * 60 * 60), 7],
    [new Date(roundedNow.getTime() - 400 * 60 * 60), 2],
    [new Date(roundedNow.getTime() - 200 * 60 * 60), 3],
    [roundedNow, 4],
  ]

  return (
    <List
      resource="Job"
      filter={{ group_by: 'minute' }}
      exporter={false}
      disableSyncWithLocation
      filters={chartFilters}
      actions={<RefreshButton />}
      empty={<></>}
      pagination={false}
      perPage={100}
    >
      <WithListContext
        render={({ data }) => (
          <GoogleChart
            width={'100%'}
            height={'64px'}
            chartType="ColumnChart"
            loader={<Loading />}
            data={data || sampleData}
            options={{
              title: 'Job RPM',
              bar: { groupWidth: '100%' },
              animation: {
                startup: true,
                easing: 'out',
                duration: 500,
              },
              // enableInteractivity: false,
              legend: 'none',
              // chartArea: { left: 40, top: 20, right: 20 },
              hAxis: {
                viewWindow: {
                  min: new Date(roundedNow.getTime() - 1000 * 60 * 60),
                  max: roundedNow,
                },
              },
              vAxis: {
                format: '#',
                viewWindow: { min: 0 },
              },
            }}
          />
        )}
      />
    </List>
  )
}
