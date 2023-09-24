import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoneIcon from '@mui/icons-material/Done'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
// import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined';
// import { CircularProgress } from '@mui/material'

export const jobStatuses: { [key: string]: { label: string; icon?: any } } = {
  scheduled: { label: 'Scheduled', icon: AccessTimeIcon },
  queued: { label: 'Queued', icon: FormatListNumberedRtlIcon },
  running: { label: 'Running', icon: RotateRightOutlinedIcon },
  errored: { label: 'Errored', icon: WarningAmberIcon },
  failed: { label: 'Failed', icon: HighlightOffIcon },
  completed: { label: 'Completed', icon: DoneIcon },
}
