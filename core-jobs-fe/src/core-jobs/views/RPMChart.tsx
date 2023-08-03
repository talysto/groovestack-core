import { Chart as GoogleChart } from 'react-google-charts'

export const RPMChart = ({ data }: { data: any }) => {
  // if (!data) return <>No recent data.</>;

  const roundedNow = new Date(Math.ceil(new Date().getTime() / 60000) * 60000)
  const sampleData = [
    ['Period', 'Jobs'],
    [new Date(roundedNow.getTime() - 1000 * 60 * 60), 1],
    [new Date(roundedNow.getTime() - 800 * 60 * 60), 2],
    [new Date(roundedNow.getTime() - 600 * 60 * 60), 7],
    [new Date(roundedNow.getTime() - 400 * 60 * 60), 2],
    [new Date(roundedNow.getTime() - 200 * 60 * 60), 3],
    [roundedNow, 4],
  ]

  return (
    <GoogleChart
      width={'100%'}
      height={'64px'}
      chartType="ColumnChart"
      loader={<div>Loading...</div>}
      data={data || sampleData}
      options={{
        title: 'Job RPM',
        bar: { groupWidth: '100%' },
        animation: {
          startup: true,
          easing: 'out',
          duration: 500,
        },
        // enableInteractivity: false,
        legend: 'none',
        // chartArea: { left: 40, top: 20, right: 20 },
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
      }}
    />
  )
}
