import get from 'lodash/get'
import {
  DateFieldProps,
  DateField as RADateField,
  useRecordContext,
} from 'react-admin'

// TODO Upgrade to DateFieldProps
export const DateField = (props: DateFieldProps) => {
  const record = useRecordContext()

  const { source } = props

  if (!record || !source) return null

  const date = get(record, source)

  // const dateString = showTime
  //   ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
  //   : `${date.toLocaleDateString()}`

  return (
    // Alt version might be simpler:
    <RADateField title={date} {...props} />
    // <Typography
    //   component="span"
    //   variant="body2"
    //   className={className}
    //   title={date}
    //   {...sanitizeFieldRestProps(rest)}
    // >
    //   {dateString}
    // </Typography>
  )
}
