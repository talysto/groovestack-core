import { Rating, RatingProps } from '@mui/material'
import { InputProps, useInput } from 'react-admin'

export interface RatingInputProps extends InputProps {
  componentProps: RatingProps
}

const RatingInput = ({ componentProps, ...props }: RatingInputProps) => {
  const { field } = useInput(props)
  return <Rating {...componentProps} {...field} />
}
export default RatingInput