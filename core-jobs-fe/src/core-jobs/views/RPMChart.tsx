import { useTheme } from '@mui/material'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { JobReportShow } from './JobReportShow'
import { echartsThemeFromMui } from './echartsThemeFromMui'
import { useRef } from 'react'

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

  const chart = useRef<ReactECharts>(null)

  return (
    <JobReportShow
      title="Performance"
      id="jobs_by_period"
      // filter={{}}
    >
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(data: RaRecord) => {
            if (!data) return <div>No data</div>

            let config = {...chartOptions} // make a copy
            config.dataset.source = data.data

            chart?.current?.getEchartsInstance().setOption(config)

            return (
              <ReactECharts
                ref={chart}
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
