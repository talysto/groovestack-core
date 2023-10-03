import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoneIcon from '@mui/icons-material/Done'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
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
