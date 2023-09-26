import { useTheme } from '@mui/material'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { JobReportShow } from './JobReportChart'
import { echartsThemeFromMui } from './echartsThemeFromMui'

// const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)

// export const rpmChartFilter = {
//   id: 'jobs_by_period',
//   // group_by_period: 'minute',
//   // start_at: dayjs().subtract(1, 'hour'),
//   // end_at: dayjs().add(1, 'hour'),
// }

// const statusesPast = ['queued', 'running', 'complete', 'failed', 'errored']
// const statuses = ['scheduled', ...statusesPast]
// const historyStatuses = ['queued', 'running', 'complete', 'failed']

export const RPMChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )

  return (
    <JobReportShow
      title="Performance"
      id="jobs_by_period"
      // filter={{}}
    >
      <SimpleShowLayout>
        <FunctionField
          render={(data: RaRecord) => {
            if (!data) return <div>No data</div>

            const config = chartOptions
            config.dataset.source = data.data

            // const processedData = data[0]?.data[0]
            // console.debug('rpm', processedData)

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
      </SimpleShowLayout>
    </JobReportShow>
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
    // type: 'time',
    // axisLabel: {
    //   formatter: '{HH}:{mm}'
    // },
    type: 'category',
  },
  yAxis: {
    type: 'value',
    // axisLabel: {inside: true}
  },
  series: [
    // { type: 'time' },
    { type: 'bar', stack: 'jobs' }, // scheduled
    { type: 'bar', stack: 'jobs' }, // queued
    { type: 'bar', stack: 'jobs' }, // running
    { type: 'bar', stack: 'jobs' }, // complete
    { type: 'bar', stack: 'jobs' }, // errored
    { type: 'bar', stack: 'jobs' }, // failed
  ],
  barCategoryGap: '0%',
}
