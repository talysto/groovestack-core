import { Chip } from '@mui/material'
import { get } from 'lodash'
import { FieldProps, useRecordContext } from 'react-admin'
import { jobStatuses } from '../../resource/jobs/jobsStatuses'
import { JobStatusType } from '../../resource/jobs/JobStatusType'

export const JobStatusField = (props: FieldProps) => {
  const record = useRecordContext()
  const { source } = props

  if (!record || !source) return null

  const status = get(record, source)

  // TODO if running then add CircularProgress
  let { icon: ChipIcon, ...rest} =  jobStatuses[status]
  const filteredChipProps: JobStatusType = { ...rest, ...(ChipIcon ? {icon: <ChipIcon />} : {} ) };

  return (
    <Chip 
      {...filteredChipProps}
      size="small" 
    />
  )
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
