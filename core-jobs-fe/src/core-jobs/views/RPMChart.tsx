import { useTheme } from '@mui/material'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { useRef } from 'react'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { JobStatusConfigs } from '../resource/jobs/JobStatusType'
import { JobReportShow } from './JobReportShow'
import { echartsThemeFromMui } from './echartsThemeFromMui'

const sentinelZero = 0.000001

export const RPMChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )

  const sConfigs = JobStatusConfigs()
  const chartOptions = {
    dataset: { source: null },
    // legend: { bottom: 0 },
    grid: {
      // left: 40,
      top: 10,
      // right: 20,
      // bottom: 20,
    },
    // Remove until you can handle sentinelZero
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number) => value.toFixed(0),
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 1,
      type: 'log',
    },
    series: [
      // { type: 'time' },
      { type: 'bar', stack: 'jobs', color: sConfigs['completed'].color }, // complete
      { type: 'bar', stack: 'jobs', color: sConfigs['failed'].color }, // failed
      { type: 'bar', stack: 'jobs', color: sConfigs['errored'].color }, // errored
      { type: 'bar', stack: 'jobs', color: sConfigs['running'].color }, // running
      { type: 'bar', stack: 'jobs', color: sConfigs['queued'].color }, // queued
      // Hide scheduled from the stack
      // { type: 'bar', stack: 'jobs', color: sConfigs['scheduled'].color }, // scheduled
    ],
    barCategoryGap: '0%',
  }

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
            if (!data?.data?.[0]) return <div>No data</div>

            const processedData = data.data.map((row: any) => {
              // convert 0 to sentinelZero to avoid log(0) error
              const processedRow = Object.keys(row).reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: row[key] === 0 ? sentinelZero : row[key],
                }),
                {},
              )

              const reversedKeys = Object.keys(processedRow)
                .reverse()
                .reduce(
                  (acc, key) => ({
                    ...acc,
                    [key]: row[key],
                  }),
                  {},
                )

              const reversedKeys2 = {
                // @ts-ignore
                period: reversedKeys.period,
                ...reversedKeys,
              }

              return {
                ...reversedKeys2, // {period: schedule: completed:} -> {period: completed: scheduled:}
                period: dayjs(row.period).format('h:mm'),
              }
            })

            const config = { ...chartOptions } // make a copy
            config.dataset.source = processedData

            chart?.current?.getEchartsInstance().setOption(config)

            return (
              <ReactECharts
                ref={chart}
                theme="custom"
                style={{
                  height: '100%',
                  width: '100%',
                  minHeight: 200,
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