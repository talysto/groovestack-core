import { Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { InputProps } from 'react-admin'

// React-admin Chart example
// https://marmelab.com/react-admin/WithListContext.html#building-a-refresh-button
export const TypographyInput = (props: PropsWithChildren<InputProps>) => <Typography variant="h6">{props.children}</Typography>
