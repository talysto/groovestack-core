import { useTheme } from '@mui/material'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { WithListContext } from 'react-admin'
import { echartsThemeFromMui } from './echartsThemeFromMui'
import { JobReportChart } from './JobReportChart'


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

// export const rpmChartFilter = {
//   id: 'jobs_by_period',
//   // group_by_period: 'minute',
//   // start_at: dayjs().subtract(1, 'hour'),
//   // end_at: dayjs().add(1, 'hour'),
// }

const statusesPast = ['queued', 'running', 'complete', 'failed', 'errored']
export const statuses = ['scheduled', ...statusesPast]

// function dayjsRange(start: Dayjs, end: Dayjs, unit: ManipulateType) {
//   const range = []
//   let current = start
//   while (!current.isAfter(end)) {
//     range.push(current)
//     current = current.add(1, unit)
//   }
//   return range
// }

const historyStatuses = ['queued', 'running', 'complete', 'failed']




export const RPMChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )

  return (
    <JobReportChart title="Performance"
    filter={{id: 'jobs_by_period'}}
    // filter={{}}
    >
      <WithListContext
        render={({ data }) => {
          if(!data) return (<div>No data</div>)

          console.debug('rpm_data', data)

          const config = chartOptions
          config.dataset.source =  data[0].data

          const processedData = data[0]?.data[0];
          console.debug('rpm', processedData)

          // dimensions: ['product', '2015', '2016', '2017'],
          // source: [
          //   { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
          //   { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
          //   { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
          //   { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
          // ]

          //.map((row: any) => {
          // const processedData = rpmMockData.map((row: any) => [
          //   dayjs(row[0]).format('h:mm'),
          //   ...row.slice(1),
          // ])


          return (
            <ReactECharts
              theme="custom"
              style={{
                height: '100%',
                width: '100%',
              }}
              option={config}
              notMerge={true}
              lazyUpdate={true}
            />
          )
        }}
      />
    </JobReportChart>
  )
}


const chartOptions = {
  dataset: { source: null },
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
}