import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoneIcon from '@mui/icons-material/Done'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import QueueIcon from '@mui/icons-material/Queue'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Chip, CircularProgress, useMediaQuery, useTheme } from '@mui/material'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  FunctionField,
  NumberField,
  RaRecord,
  TextField,
} from 'react-admin'
import { JobActions } from './JobsList'

export const JobDatagrid = () => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Datagrid
      //  bulkActionButtons={!moreThanSmall && false}
      sort={{ field: 'priority', order: 'ASC' }}
    >
      <FunctionField
        label="Job"
        render={(record: any) => (
          <div>
            <div>{record.type}</div>
            <small style={{ marginRight: 5 }} title={record.id}>
              {record.id.substring(0, 6)}
            </small>
          </div>
        )}
      />

      <TextField source="queue" sortable={false} />
      {moreThanSmall && <NumberField source="priority" />}
      <FunctionField label="Status" render={JobStatusField} />

      <TimeAgoField label="Scheduled" source="run_at" />
      <JobActions label="" />
    </Datagrid>
  )
}

// const JobStatusField = (record: RaRecord) => {
//   const theme = useTheme()
//   const moreThanSmall = useMediaQuery(theme.breakpoints.up('md'))

//   // var extended = null;
//   const runningIcon = <CircularProgress size="0.75em" />;
//   const errorIcon = <WarningAmberIcon sx= {{fontSize:  "0.75em"}} />
//   const schedueledIcon = <AccessTimeIcon sx= {{fontSize:  "0.75em"}} />
//   const failedIcon = <HighlightOffIcon sx= {{fontSize:  "0.75em"}} />
//   const completeIcon = <DoneIcon sx= {{fontSize:  "0.75em"}} />
//   const queueIcon = <QueueIcon sx= {{fontSize:  "0.75em"}} />

//   const statusMap: { [key: string]: JSX.Element; } = {
//     running: <Chip label={'Running'} size="small" icon={runningIcon} />,
//     failed: (
//       <Chip label={'Failed'} variant="outlined" color="error" size="small" icon={failedIcon} />
//     ),
//     error: <Chip label={`Error/Retry`} variant="outlined" size="small" icon={errorIcon} />,
//     scheduled: <Chip label={'Scheduled'} size="small" icon={schedueledIcon}/>,
//     queued: <Chip label={'Queued'} size="small" icon={queueIcon} />,
//     complete: <Chip label={'Complete'} size="small" icon={completeIcon} />,
//   };

//   return statusMap[record.status] || <Chip label={record.status} size="small" />;};

const JobStatusField = (record: RaRecord) => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('md'))

  const runningIcon = <CircularProgress size="0.75em" />
  const errorIcon = <WarningAmberIcon sx={{ fontSize: '0.75em' }} />
  const scheduledIcon = <AccessTimeIcon sx={{ fontSize: '0.75em' }} />
  const failedIcon = <HighlightOffIcon sx={{ fontSize: '0.75em' }} />
  const completeIcon = <DoneIcon sx={{ fontSize: '0.75em' }} />
  const queueIcon = <QueueIcon sx={{ fontSize: '0.75em' }} />

  const statusChip = (
    label: string,
    icon: JSX.Element,
    variant: 'filled' | 'outlined',
    color:
      | 'default'
      | 'error'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning',
  ) =>
    moreThanSmall ? (
      <Chip
        label={label}
        size="small"
        icon={icon}
        variant={variant}
        color={color}
      />
    ) : (
      <Chip
        size="small"
        icon={icon}
        variant={variant}
        color={color}
        sx={{ '& .MuiChip-icon': { ml: 1.25 } }}
      />
    )

  const statusMap: { [key: string]: JSX.Element | null } = {
    running: statusChip('Running', runningIcon, 'filled', 'default'),
    failed: statusChip('Failed', failedIcon, 'outlined', 'error'),
    error: statusChip('Error/Retry', errorIcon, 'outlined', 'default'),
    scheduled: statusChip('Scheduled', scheduledIcon, 'filled', 'default'),
    queued: statusChip('Queued', queueIcon, 'filled', 'default'),
    complete: statusChip('Complete', completeIcon, 'filled', 'default'),
  }

  return statusMap[record.status] || <Chip label={record.status} size="small" />
}

// '& .MuiChip-root' = {}
