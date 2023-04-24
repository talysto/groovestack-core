import SvgIcon from '@mui/material/SvgIcon/SvgIcon'

export const NormalizeIcon: React.FC = (Icon: typeof SvgIcon) => {
  return ((Icon as any).default ? (Icon as any).default : Icon['default']) as typeof SvgIcon
}
