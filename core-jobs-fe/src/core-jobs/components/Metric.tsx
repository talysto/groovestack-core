import { Card, CardContent, Typography, useTheme } from '@mui/material'
import { numberToHuman } from './util'

export type MetricType = {
  label: string
  value: number | string | JSX.Element
  units?: string
  onClick?: () => void
}

export const Metric = ({ value, label, units }: MetricType) => {
  const theme = useTheme()

  let tVal, tUnits

  if (typeof value === 'number'  && !units) {
    [tVal, tUnits]  = numberToHuman(value).toString().split(' ')
  }
  else {
    tVal = value
    tUnits = units
  }

  return (
    <Card
      // onClick={() => { alert('click')}}
      sx={{ flex: 1, borderWidth: 3, pt: 1, pb: 1, minWidth: 80 }}
      elevation={0}
      variant='outlined'
    >
      <CardContent
        sx={{
          // height: '100%',
          p: 1,
          // background: `color-mix(in srgb, ${theme.palette.primary.main} 20%, white)`,
          color: theme.palette.primary.main,
          '&:last-child': { pb: 0 }
        }}
      >
        <Typography
          component="div"
          sx={{ lineHeight: '1.0em', fontWeight: 'bold', fontSize: '150%' }}
        >
          {tVal == '0' ? '-' : tVal}
          {tUnits && (
            <Typography component="span" sx={{ fontSize: '60%' }}>
              {tUnits}
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
