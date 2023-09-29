import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export type JobStatusType = {
  id: 'scheduled' | 'queued' | 'running' | 'errored' | 'failed' | 'completed';
  label: string;
  icon?: any;
  color?: any;
};


export function JobStatusConfigs() {
  const theme = useTheme();

  return {
    scheduled: { id: 'scheduled', label: 'Scheduled', icon: AccessTimeIcon, color: grey[300] },
    queued: { id: 'queued', label: 'Queued', icon: FormatListNumberedRtlIcon, color: grey[600] },
    running: { id: 'running', label: 'Running', icon: RotateRightOutlinedIcon, color: theme.palette.info.light },
    errored: { id: 'errored', label: 'Errored', icon: WarningAmberIcon, color: theme.palette.warning.main },
    failed: { id: 'failed', label: 'Failed', icon: HighlightOffIcon, color: theme.palette.error.main },
    completed: { id: 'completed', label: 'Completed', icon: DoneIcon, color: theme.palette.success.main }
  };
}
