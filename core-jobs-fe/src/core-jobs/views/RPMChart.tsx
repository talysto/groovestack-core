import { DateRangeFilter, CommonDateRanges } from '@moonlight-labs/core-base-fe'
import { CheckboxGroupInput, List, Loading, RefreshButton, TopToolbar, WithListContext } from 'react-admin'
import { Chart as GoogleChart } from 'react-google-charts'
import { TypographyInput } from './TypographyInput'
import { jobStatuses } from '../resource/jobs/jobsStatuses'

const chartFilters = [
  <TypographyInput key={'na_title'} source={'title'} alwaysOn>RPM Chart</TypographyInput>,
  <CheckboxGroupInput
    key={'statuses'}
    alwaysOn
    source="status"
    label={false}
    size="small"
    choices={jobStatuses}
  />,
  // <DateRangeFilter key={'range'}
  //   defaultValue={CommonDateRanges.Today.getValue()}
  //   // namedFilters={cashFlowShortcuts}
  //   />

  // formatValueForSearchParams: formatDateRangeForSearchParams,
  // transformSearchParamsToVal: transformSearchParamsToDateRange,

]

const ListActions = () => (
  <TopToolbar>
      <RefreshButton />
  </TopToolbar>
)

export const RPMChart = () => {
  // if (!data) return <>No recent data.</>;

  const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)
  // const sampleData = [
  //   ['Period', 'Scheduled', 'Queued'],
  //   [new Date(roundedNow.getTime() - 1000 * 60 * 60), 1, 2],
  //   [new Date(roundedNow.getTime() - 800 * 60 * 60), 2, 4],
  //   [new Date(roundedNow.getTime() - 600 * 60 * 60), 7, 6],
  //   [new Date(roundedNow.getTime() - 400 * 60 * 60), 2, 0],
  //   [new Date(roundedNow.getTime() - 200 * 60 * 60), 3, 1],
  //   [roundedNow, 4, 2],
  // ]

  // data = sampleData

  return (
    <List
      resource="JobReport"
      // filter={{ group_by: 'minute' }}
      exporter={false}
      disableSyncWithLocation
      filters={chartFilters}
      actions={<ListActions />}
      empty={<>No data</>}
      pagination={false}
      perPage={100}
    >
      <WithListContext
        render={({ data }) => {
            const processedData = data && data[0]?.data //.map((row: any) => {

            return (
              <GoogleChart
                width={'100%'}
                height={'64px'}
                chartType="ColumnChart"
                loader={<Loading />}
                data={processedData}
                options={{
                  title: 'Job RPM',
                  bar: { groupWidth: '100%' },
                  animation: {
                    startup: true,
                    easing: 'out',
                    duration: 500,
                  },
                  isStacked: true,
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
                }} />
            )
          }}
      />
    </List>
  )
}
