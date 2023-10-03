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
  const chipProps =  jobStatuses[status]
  const ChipIcon = chipProps ? chipProps.icon : null

  const filteredChipProps = { ...chipProps };
  delete filteredChipProps.icon;

  // return <FunctionField render={() => <Chip {...chipProps} size="small" />} />
  return <FunctionField render={() => <Chip icon={<ChipIcon />} {...filteredChipProps} size="small" />} />;

}

// -  const chipProps = jobStatuses[status]
// +  const chipProps =  jobStatuses[status]
// +  const chipIcon = chipProps ? chipProps.icon : null
// +
// +  const filteredChipProps = { ...chipProps };
// +  delete filteredChipProps.icon;
// +
// +  // return <FunctionField render={() => <Chip {...chipProps} size="small" />} />
// +  return <FunctionField render={() => <Chip icon={chipIcon} {...filteredChipProps} size="small" />} />;

// -  return <FunctionField render={() => <Chip {...chipProps} size="small" />} />
