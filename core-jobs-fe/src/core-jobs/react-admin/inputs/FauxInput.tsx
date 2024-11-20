import { Box, SxProps } from '@mui/material'
import { InputProps } from 'react-admin'

export type tProps = InputProps & {
  children: React.ReactNode
  sx?: SxProps
}

export const FauxInput = ({ sx, children }: tProps) => (
  <Box sx={sx}>{children}</Box>
)
