import { Box, SxProps, Typography } from '@mui/material'
// import { PropsWithChildren } from 'react'
import { InputProps } from 'react-admin'

export type tProps = InputProps & {
  children: any
  sx?: SxProps
}

// React-admin Chart example
// https://marmelab.com/react-admin/WithListContext.html#building-a-refresh-button
export const TypographyInput = ({ sx, children }: tProps) => (
  <Typography variant="h6" sx={sx}>
    {children}
  </Typography>
)

export const FauxInput = ({ sx, children }: tProps) => (
  <Box sx={sx}>{children}</Box>
)
