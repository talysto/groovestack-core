// TODO: Remove this file and reference from core-base when published
import { Rating, RatingProps } from '@mui/material'
import { InputProps, useInput } from 'react-admin'

export interface RatingInputProps extends InputProps {
  componentProps?: RatingProps
}

/**
 * RatingInput is a React Admin Input that formats a rating value as a MUI rating component.
 *
 * FEATURES
 * - Standard React Admin Input property interface and the ability to pass MUI Rating component props via 'componentProps'
 *
 * TODO
 * - test further
 *
 * NOTES
 * - Rating Input allows people to share there opinions on something.
 */
export const RatingInput = ({ componentProps, ...props }: RatingInputProps) => {
  const { field } = useInput(props)
  return <Rating {...componentProps} {...field} />
}
