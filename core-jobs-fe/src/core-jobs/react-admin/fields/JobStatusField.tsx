import { Chip } from '@mui/material'
import { get } from 'lodash'
import { FieldProps, FunctionField, useRecordContext } from 'react-admin'
import { jobStatuses } from '../../resource/jobs/jobsStatuses'

export const JobStatusField = (props: FieldProps) => {
  const record = useRecordContext(props)
  const { source } = props

  if (!record || !source) return null

  const status = get(record, source)

  // TODO if running then add CircularProgress
  const chipProps = jobStatuses[status]

  return <FunctionField render={() => <Chip {...chipProps} size="small" />} />
}
