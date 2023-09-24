import WorkerIcon from '@mui/icons-material/SettingsSuggest'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
} from '@mui/material'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { random } from 'lodash'
import { WithListContext } from 'react-admin'
import { JobReportChart } from './JobReportChart'
import { echartsThemeFromMui } from './echartsThemeFromMui'

// import { echartsThemeFromMui } from './echartsThemeFromMui'
// echarts.registerTheme('custom', echartsThemeFromMui())

export const UtilizationChart = () => {
  const theme = useTheme()
  echarts.registerTheme(
    'custom',
    echartsThemeFromMui(theme.palette.primary.main),
  )

  return (
    <JobReportChart title="Utilization" filter={{ id: 'jobs_kpis' }}>
      <WithListContext
        render={({ data }) => {
          if (!data) return <div>No data</div>

          const record = data[0].data[0]
          // console.debug('jobs_kpis', record)

          const workers = record.workers
          const running = record.running
          const utilization = Math.round((100.0 * running) / workers)

          const config = utilizationOptions
          config.series[0].data[0].value = utilization

          return (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              alignItems="stretch"
            >
              <Box sx={{ flexBasis: '40%' }}>
                <ReactECharts
                  theme="custom"
                  style={{
                    // flexBasis: '100%',
                    height: '100%',
                    width: '100%',
                  }}
                  option={utilizationOptions}
                />
              </Box>

              <Box sx={{ flexBasis: '60%' }}>
                <List disablePadding>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="show">
                        <WorkerIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    {/* <ListItemAvatar>
                     <Typography variant="h6">{workers}</Typography>
                  </ListItemAvatar> */}
                    <ListItemText
                      primary={`${workers} Workers`}
                      // secondary="Workers"
                    />
                  </ListItem>
                  <ListItem
                  // secondaryAction={
                  //   <IconButton edge="end" aria-label="show">
                  //      <WorkerIcon />
                  //   </IconButton>
                  // }
                  >
                    {/* <ListItemAvatar>
                     <Typography variant="h6">{running}</Typography>
                  </ListItemAvatar> */}
                    <ListItemText
                      primary={`${running} Running Jobs`}
                      // secondary="Running Jobs"
                    />
                  </ListItem>
                </List>
                {/* <Stack spacing={2}>
                  <Metric label="Running" value={running} units="Jobs" />
                  <MetricPopover
                    metricProps={{ label: 'Workers', value: workers }}
                  >
                    <Paper sx={{ p: 3 }}>
                      <WorkersTable />
                    </Paper>
                  </MetricPopover>
                </Stack> */}
              </Box>

              {/* <KPIs /> */}
            </Stack>
          )
        }}
      />
    </JobReportChart>
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
