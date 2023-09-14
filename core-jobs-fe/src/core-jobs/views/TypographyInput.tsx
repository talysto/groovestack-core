import { Typography } from '@mui/material'

// React-admin Chart example
// https://marmelab.com/react-admin/WithListContext.html#building-a-refresh-button
export const TypographyInput = ({
  alwaysOn,
  children,
}: {
  alwaysOn: boolean
  children: any
}) => <Typography variant="h6">{children}</Typography>
