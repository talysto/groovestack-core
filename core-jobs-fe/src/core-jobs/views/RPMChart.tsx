import { useTheme } from '@mui/material'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { random } from 'lodash'
import { List, RefreshButton, TopToolbar, WithListContext } from 'react-admin'
import { TypographyInput } from './TypographyInput'
import { echartsThemeFromMui } from './echartsThemeFromMui'

const ChartFilters = ({ title }: { title: string }) => [
  <TypographyInput key={'na_title'} source={'title'} alwaysOn>
    {title}
  </TypographyInput>,
  // <CheckboxGroupInput
  //   key={'statuses'}
  //   alwaysOn
  //   source="status"
  //   label={false}
  //   size="small"
  //   choices={jobStatuses}
  // />,
  // <DateRangeFilter key={'range'}
  //   defaultValue={CommonDateRanges.Today.getValue()}
  //   // namedFilters={cashFlowShortcuts}
  //   />

  // formatValueForSearchParams: formatDateRangeForSearchParams,
  // transformSearchParamsToVal: transformSearchParamsToDateRange,
]

export const JobReportChart = ({
  title,
  filter,
  children,
}: {
  title: string
  filter: any
  children: any
}) => {
  return (
    <List
      title=' '
      resource="JobReport"
      exporter={false}
      disableSyncWithLocation
      actions={
        <TopToolbar>
          <RefreshButton />
        </TopToolbar>
      }
      // empty={<>No data</>}
      empty={false}
      pagination={false}
      perPage={100}
      sx={{ '& .RaList-content': { boxShadow: 'none' } }}
      filters={<ChartFilters title={title} />}
      filter={filter}
    >
      {children}
    </List>
  )
}

const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)
const rpmChartOptions = {
  bar: { groupWidth: '100%' },
  animation: {
    startup: true,
    easing: 'out',
    duration: 500,
  },
  isStacked: true,
  legend: 'none',
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
}

export const rpmChartFilter = {
  group_by_period: 'minute',
  start_at: dayjs().subtract(1, 'hour'),
  end_at: dayjs().add(1, 'hour'),
}

const statusesPast = ['queued', 'running', 'complete', 'failed', 'errored']
export const statuses = ['scheduled', ...statusesPast]

function dayjsRange(start: Dayjs, end: Dayjs, unit: ManipulateType) {
  const range = []
  let current = start
  while (!current.isAfter(end)) {
    range.push(current)
    current = current.add(1, unit)
  }
  return range
}

const historyStatuses = ['queued', 'running', 'complete', 'failed']

const rpmMockData = [
  ['Period', ...historyStatuses],
  // ...(dayjsRange(dayjs().subtract(1, 'hour'), dayjs().add(1,'hour'), 'minute').map((d: Dayjs) => [d.toDate(), ...statuses.map(() => random(1, 50))]))
  ...dayjsRange(
    dayjs(roundedNow).subtract(1, 'hour'),
    dayjs(roundedNow),
    'minute',
  ).map((d: Dayjs) => [
    d.toISOString(),
    ...historyStatuses.map(() => random(1, 50)),
  ]),
]

export const RPMChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )

  return (
    <JobReportChart title="Performance" filter={rpmChartFilter}>
      <WithListContext
        render={({ data }) => {
          // const processedData = data && data[0]?.data; //.map((row: any) => {
          const processedData = rpmMockData.map((row: any) => [
            dayjs(row[0]).format('h:mm'),
            ...row.slice(1),
          ])
          return (
            <ReactECharts
              theme="custom"
              style={{
                height: '100%',
                width: '100%',
              }}
              option={{
                dataset: { source: processedData },
                grid: {
                  left: 40,
                  top: 10,
                  right: 20,
                  bottom: 20,
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                  },
                },
                xAxis: {
                  type: 'category',
                  // axisLabel: {
                  //   formatter: '{HH}:{mm}'
                  // },
                  // data: processedData.map((row: any) => row[0]).slice(1)
                  // show: true
                  // axisLabel: { interval: 0, rotate: 30 }
                },
                yAxis: {
                  // show: true,
                  // inverse: true,
                  type: 'value',
                  // axisLabel: {inside: true}
                },
                series: [
                  // { type: 'time' },
                  { type: 'bar', stack: 'jobs' },
                  { type: 'bar', stack: 'jobs' },
                  { type: 'bar', stack: 'jobs' },
                  { type: 'bar', stack: 'jobs' },
                ],
                barCategoryGap: '0%',
              }}
              notMerge={true}
              lazyUpdate={true}
            />
          )
        }}
      />
    </JobReportChart>
  )
}
