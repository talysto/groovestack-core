import { Typography } from '@mui/material'
import get from 'lodash/get'
import { sanitizeFieldRestProps, useRecordContext } from 'react-admin'

// TODO Upgrade to DateFieldProps
export const DateField = ({
  source,
  className,
  showTime,
  label,
  ...rest
}: {
  source: string
  showTime?: boolean
  label?: string
  className?: string
}) => {
  const record = useRecordContext()

  const date = get(record, source)

  const dateString = showTime
    ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
    : `${date.toLocaleDateString()}`

  return (
    // Alt version might be simpler:
    // <DateField title={date} {...props} />
    <Typography
      component="span"
      variant="body2"
      className={className}
      title={date}
      {...sanitizeFieldRestProps(rest)}
    >
      {dateString}
    </Typography>
  )
}
