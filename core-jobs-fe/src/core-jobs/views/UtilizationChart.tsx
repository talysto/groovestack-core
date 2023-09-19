import { Box, Stack, useTheme } from '@mui/material'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { random } from 'lodash'
import { WithListContext } from 'react-admin'
import { KPIs } from './KPIs'
import { JobReportChart, rpmChartFilter } from './RPMChart'
import { echartsThemeFromMui } from './echartsThemeFromMui'

// import { echartsThemeFromMui } from './echartsThemeFromMui'
// echarts.registerTheme('custom', echartsThemeFromMui())

export const UtilizationChart = () => {
  const theme = useTheme();
  echarts.registerTheme('custom', echartsThemeFromMui(theme.palette.primary.main))

  return (
    <JobReportChart title="Utilization" filter={rpmChartFilter}>
      <WithListContext
        render={({ data }) => {
          // const processedData = data && data[0]?.data; //.map((row: any) => {
          // const processedData = rpmMockData.map((row: any) => [dayjs(row[0]).format('h:mm'), ...row.slice(1)])
          return (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              alignItems="stretch"
            >
              <Box sx={{ flexBasis: '100%' }}>
                <ReactECharts
                  theme="custom"
                  style={{
                    // flexBasis: '100%',
                    height: '100%',
                    width: '100%',
                  }}
                  option={utilizationOptions} />
              </Box>

              <Box sx={{ flexBasis: '100%' }}>
                <KPIs />
              </Box>

              {/* <KPIs /> */}
            </Stack>
          )
        } } />
    </JobReportChart>
  )
}

const utilizationOptions = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      // theme: 'custom',
      // radius: ['90%', '100%'],
      // grid: {
      //   left: 0,
      //   top: 0,
      //   right: 0,
      //   bottom: 0
      // },
      // detail: {
      //   formatter: '{value}'
      // },
      detail: {
        // width: 50,
        // height: 14,
        // fontSize: 14,
        color: 'inherit',
        // borderColor: 'inherit',
        // borderRadius: 20,
        // borderWidth: 1,
        formatter: '{value}%',
      },
      data: [
        {
          value: random(0, 100),
          detail: {
            offsetCenter: ['0%', '0%'],
            valueAnimation: true,
          },
          // name: 'Utilization',
        },
      ],
      // startAngle: -180,
      // endAngle: 0,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          // borderColor: '#464646',
        },
      },
      // axisLine: {
      //   lineStyle: {
      //     width: 40,
      //   },
      // },
      splitLine: {
        show: false,
        //   distance: 0,
        //   length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        // distance: 50,
      },
      // title: {
      //   fontSize: 14,
      // },
    },
  ],
}
