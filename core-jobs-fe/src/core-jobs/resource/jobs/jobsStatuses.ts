import {
  AccessTime as AccessTimeIcon,
  Done as DoneIcon,
  FormatListNumberedRtl as FormatListNumberedRtlIcon,
  HighlightOff as HighlightOffIcon,
  RotateRightOutlined as RotateRightOutlinedIcon,
  WarningAmber as WarningAmberIcon
} from '@mui/icons-material'
import { JobStatusType } from './JobStatusType'

// import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined';
// import { CircularProgress } from '@mui/material'

export const jobStatuses: { [key: string]: JobStatusType } = {
  scheduled: { id: 'scheduled', label: 'Scheduled', icon: AccessTimeIcon },
  queued: { id: 'queued', label: 'Queued', icon: FormatListNumberedRtlIcon },
  running: { id: 'running', label: 'Running', icon: RotateRightOutlinedIcon },
  errored: { id: 'errored', label: 'Errored', icon: WarningAmberIcon },
  failed: { id: 'failed', label: 'Failed', icon: HighlightOffIcon },
  completed: { id: 'completed', label: 'Completed', icon: DoneIcon },
}
