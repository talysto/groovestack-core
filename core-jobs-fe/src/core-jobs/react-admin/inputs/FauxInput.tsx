import { Box, SxProps, Typography } from '@mui/material'
import { InputProps } from 'react-admin'

export type tProps = InputProps & {
  children: any
  sx?: SxProps
}

export const FauxInput = ({ sx, children }: tProps) => (
  <Box sx={sx}>{children}</Box>
)
