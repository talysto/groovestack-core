import { Alert, Button, ButtonGroup, Stack, useTheme } from '@mui/material'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { random } from 'lodash'
import { useContext, useRef } from 'react'
import { FunctionField, RaRecord, SimpleShowLayout } from 'react-admin'
import { WorkersTable } from '../resource/workers/WorkersTable'
import { ButtonPopover } from './ButtonPopover'
import { JobReportShow } from './JobReportShow'
import { echartsThemeFromMui } from './echartsThemeFromMui'
import { JobsKPIsContext } from '../resource/jobs/JobsList'

// import { echartsThemeFromMui } from './echartsThemeFromMui'
// echarts.registerTheme('custom', echartsThemeFromMui())

export const UtilizationChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )
  const chart = useRef<ReactECharts>(null)

  const kpis = useContext(JobsKPIsContext)

  return (
    <JobReportShow id="jobs_kpis" title="Utilization" data={kpis}>
      <SimpleShowLayout sx={{ p: 0 }}>
        <FunctionField
          render={(record: RaRecord) => {
            if (!record?.data?.[0]) return <div>No data</div>
            
            const data = record.data[0]

            const workers = data.workers
            // We use min() because Que locks a 'buffer' of jobs for increased performance. We don't know which one is being processed.
            const running = Math.min(data.running, workers)
            const utilization = Math.round((100.0 * running) / workers) || 0

            const config = { ...utilizationOptions } // make a copy
            config.series[0].data[0].value = utilization

            chart?.current?.getEchartsInstance().setOption(config)

            return (
              <Stack
                spacing={2}
                justifyContent="space-around"
                alignItems="stretch"
                p={0}
              >
                {/* <Box sx={{ flexBasis: '40%' }}> */}
                <ReactECharts
                  ref={chart}
                  theme="custom"
                  style={{
                    // flexBasis: '100%',
                    height: '100%',
                    width: '100%',
                    minHeight: 160,
                  }}
                  option={config}
                />
                {/* </Box> */}

                {/* <Box sx={{ flexBasis: '60%' }}> */}
                {workers == 0 && (
                  <Alert severity="warning">
                    There are no worker processes to process jobs.
                  </Alert>
                )}
                <ButtonGroup
                  variant="text"
                  size="large"
                  aria-label="large button group"
                  sx={{ justifyContent: 'space-around' }}
                >
                  <ButtonPopover sx={{flex: 1}} label={`${workers} Workers`}>
                    <WorkersTable />
                  </ButtonPopover>
                  <Button sx={{flex: 1}} disabled>{`${running} Running Jobs`}</Button>
                </ButtonGroup>
                {/* </Box> */}

                {/* <KPIs /> */}
              </Stack>
            )
          }}
        />
      </SimpleShowLayout>
    </JobReportShow>
  )
}

const utilizationOptions = {
  // tooltip: {
  //   formatter: '{a} <br/>{b} : {c}%',
  // },
  series: [
    {
      // name: 'Pressure',
      type: 'gauge',
      radius: '100%',
      detail: {
        fontSize: 20,
        color: 'inherit',
        formatter: '{value}%',
      },
      data: [
        {
          value: random(0, 100),
          detail: {
            offsetCenter: ['0%', '0%'],
            valueAnimation: true,
          },
        },
      ],
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
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
  ],
}
