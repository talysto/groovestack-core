import { Card, CardContent, Typography, useTheme } from '@mui/material'

export type MetricType = {
  label: string
  value: string | JSX.Element
  units?: string
  onClick?: any
}

export const Metric = ({ value, label, units }: MetricType) => {
  const theme = useTheme()
  return (
    <Card
      // onClick={() => { alert('click')}}
      sx={{ flex: 1 }}
    >
      <CardContent
        sx={{
          height: '100%',
          p: 1,
          background: `color-mix(in srgb, ${theme.palette.primary.main} 20%, white)`,
          color: theme.palette.primary.main,
        }}
      >
        <Typography
          component="div"
          sx={{ lineHeight: '1.0em', fontWeight: 'bold', fontSize: '150%' }}
        >
          {value}
          {units && (
            <Typography component="span" sx={{ fontSize: '60%' }}>
              {units}
            </Typography>
          )}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '80%',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  )
}
