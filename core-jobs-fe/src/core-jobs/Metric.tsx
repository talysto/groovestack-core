import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material'

export type MetricType = {
  label: string
  value: string
  units?: string
  onClick?: any
}

export const Metric = ({ value, label, units, onClick }: MetricType) => {
  const theme = useTheme()
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent
          sx={{ p: 1, background: theme.palette.primary.main, color: 'white' }}
        >
          <div>
            <Typography
              component="span"
              sx={{ lineHeight: '1.0em', fontWeight: 'bold', fontSize: '150%' }}
            >
              {value}
            </Typography>
            {units && (
              <Typography component="span" sx={{ fontSize: '0.8em' }}>
                {units}
              </Typography>
            )}
          </div>
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
        {/* {onClick && <CardActions>
            <Button size="small" color="primary" onClick={onClick}>
              View
            </Button>
          </CardActions>} */}
      </CardActionArea>
    </Card>
  )
}
