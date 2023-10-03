import * as echarts from 'echarts'
// import { JobReportChart } from './JobReportChart'

// TODO refactor to pull theme color
echarts.registerTheme('custom', {
  backgroundColor: '#f4cccc',
})

// TODO
// Reduce size: https://www.npmjs.com/package/echarts-for-react
// export const QueChart = () => (
//   <JobReportChart title="Jobs by Status" filter={queChartFilter}>
//     <WithListContext
//       render={({ data }) => {
//         const processedData = data && data[0]?.data //.map((row: any) => {
//         return (
//           <ReactECharts
//             theme="roma"
//             option={{
//               dataset: { source: queMockData },
//               tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                   type: 'shadow',
//                 },
//               },
//               xAxis: {
//                 type: 'value',
//                 show: false,
//                 // axisLabel: { interval: 0, rotate: 30 }
//               },
//               yAxis: {
//                 show: false,
//                 type: 'category',
//                 inverse: true,
//                 // axisLabel: {inside: true}
//               },
//               series: {
//                 type: 'bar',
//                 encode: {
//                   x: 'Jobs',
//                   y: 'Status',
//                 },
//                 label: {
//                   show: true,
//                   formatter: '{b}',
//                   position: 'right',
//                   valueAnimation: true,
//                 },
//               },
//             }}
//             notMerge={true}
//             lazyUpdate={true}
//             // theme={"theme_name"}
//             // onChartReady={this.onChartReadyCallback}
//             // onEvents={EventsDict}
//             // opts={}
//           />
//         )
//       }}
//     />
//   </JobReportChart>
// )

// const queChartOptions = {
//   // bar: { groupWidth: '100%' },
//   animation: {
//     startup: true,
//     easing: 'out',
//     duration: 500,
//   },
//   legend: 'none',
//   bars: 'horizontal'
// };
const queChartFilter = {
  group_by: 'status',
  // group_by_period: 'minute',
  // start_at: dayjs().subtract(1, 'hour'),
  // end_at: dayjs().add(1, 'hour'),
}
const queMockData = [
  ['Status', 'Jobs'],
  ['scheduled', 250_000],
  ['queued', 4503],
  ['running', 24],
  ['failed', 12],
  ['errored', 234],
  ['completed', 65000],
]
// console.log('queMockData', queMockData);

// export const QueChart2 = () => (
//   <JobReportChart title="Job Queue" filter={queChartFilter}>
//     <WithListContext
//       render={({ data }) => {
//         const processedData = data && data[0]?.data; //.map((row: any) => {
//         return (
//           <GoogleChart
//             width={'100%'}
//             // height={'64px'}
//             chartType="Bar"
//             loader={<Loading />}
//             data={processedData || queMockData}
//             options={queChartOptions} />
//         );
//       }} />
//   </JobReportChart>
// );
