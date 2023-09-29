import { useTheme } from '@mui/material'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react' // or var ReactECharts = require('echarts-for-react');
import { useRef } from 'react'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { JobReportShow } from './JobReportShow'
import { echartsThemeFromMui } from './echartsThemeFromMui'
import { JobStatusConfigs } from '../resource/jobs/JobStatusType'


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
    legend: {
      bottom: 0
    },
    // {
    //   data: ['Evaporation', 'Precipitation', 'Temperature']
    // },
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
      // type: 'time',
      // axisLabel: {
      //   formatter: '{HH}:{mm}'
      // },
      type: 'category',
    },
    yAxis: {
      min: 1,
      // max: 'dataMax',
      type: 'log',
      // logBase: 10,
      // type: 'value',
      // axisLabel: {inside: true}
    },
    series: [
      // { type: 'time' },
      { type: 'bar', stack: 'jobs', color: sConfigs['completed'].color }, // complete
      { type: 'bar', stack: 'jobs', color: sConfigs['failed'].color }, // failed
      { type: 'bar', stack: 'jobs', color: sConfigs['errored'].color }, // errored
      { type: 'bar', stack: 'jobs', color: sConfigs['running'].color }, // running
      { type: 'bar', stack: 'jobs', color: sConfigs['queued'].color }, // queued
      { type: 'bar', stack: 'jobs', color: sConfigs['scheduled'].color }, // scheduled
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
            if (!data) return <div>No data</div>

            const processedData = data.data.map((row: any) => {
              // convert 0 to sentinelZero to avoid log(0) error
              const processedRow = Object.keys(row).reduce((acc, key) => ({
                ...acc,
                [key]: row[key] === 0 ? sentinelZero : row[key]
              }), {})

              const reversedKeys = Object.keys(processedRow).reverse().reduce((acc, key) => ({
                ...acc,
                [key]: row[key]
              }), {})

              console.debug('r1', reversedKeys)


              // @ts-ignore-line
              const reversedKeys2 = {period: reversedKeys.period, ...reversedKeys}
              // const reversedKeys2 = Object.keys(reversedKeys).reduce((acc, key) => ({
              //   ...acc,
              //   period: row.period,

              // }), {period: row.period})

              console.debug('r2', reversedKeys2)

              return (
                {
                  ...reversedKeys2, // {period: schedule: completed:} -> {period: completed: scheduled:}
                  period: dayjs(row.period).format('h:mm'),
                }
              )
            })

            let config = { ...chartOptions } // make a copy
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



// See https://echarts.apache.org/en/option.html#tooltip.formatter
// const formatter = () => {
//   return (
//     <div
//       class=""
//       style="position: absolute; display: block; border-style: solid; white-space: nowrap; z-index: 9999999; will-change: transform; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgb(255, 255, 255); border-width: 1px; border-radius: 4px; color: rgb(102, 102, 102); font: 14px / 21px sans-serif; padding: 10px; top: 0px; left: 0px; transform: translate3d(111px, 151px, 0px); border-color: rgb(255, 255, 255); pointer-events: none;"
//     >
//       <div style="margin: 0px 0 0;line-height:1;">
//         <div style="margin: 0px 0 0;line-height:1;">
//           <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">
//             Sun
//           </div>
//           <div style="margin: 10px 0 0;line-height:1;">
//             <div style="margin: 0px 0 0;line-height:1;">
//               <div style="margin: 0px 0 0;line-height:1;">
//                 <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#5470c6;"></span>
//                 <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
//                   Direct
//                 </span>
//                 <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
//                   320
//                 </span>
//                 <div style="clear:both"></div>
//               </div>
//               <div style="clear:both"></div>
//             </div>
//             <div style="margin: 10px 0 0;line-height:1;">
//               <div style="margin: 0px 0 0;line-height:1;">
//                 <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#91cc75;"></span>
//                 <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
//                   Mail Ad
//                 </span>
//                 <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
//                   210
//                 </span>
//                 <div style="clear:both"></div>
//               </div>
//               <div style="clear:both"></div>
//             </div>
//             <div style="margin: 10px 0 0;line-height:1;">
//               <div style="margin: 0px 0 0;line-height:1;">
//                 <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#fac858;"></span>
//                 <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
//                   Affiliate Ad
//                 </span>
//                 <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
//                   310
//                 </span>
//                 <div style="clear:both"></div>
//               </div>
//               <div style="clear:both"></div>
//             </div>
//             <div style="margin: 10px 0 0;line-height:1;">
//               <div style="margin: 0px 0 0;line-height:1;">
//                 <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#ee6666;"></span>
//                 <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
//                   Video Ad
//                 </span>
//                 <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
//                   410
//                 </span>
//                 <div style="clear:both"></div>
//               </div>
//               <div style="clear:both"></div>
//             </div>
//             <div style="margin: 10px 0 0;line-height:1;">
//               <div style="margin: 0px 0 0;line-height:1;">
//                 <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#73c0de;"></span>
//                 <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
//                   Search Engine
//                 </span>
//                 <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
//                   1320
//                 </span>
//                 <div style="clear:both"></div>
//               </div>
//               <div style="clear:both"></div>
//             </div>
//             <div style="clear:both"></div>
//           </div>
//           <div style="clear:both"></div>
//         </div>
//         <div style="clear:both"></div>
//       </div>
//     </div>
//   )
// }
